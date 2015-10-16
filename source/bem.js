/*!
 * A small jQuery library that helps to create CSS classes according to the BEM methodology.
 * https://github.com/eakoryakin/jquery-bem
 *
 * Copyright (c) 2015 Evgenii Koriakin.
 * Released under the MIT license.
 */
window.bem = {};

(function (bem) {
    // Fields.
    bem.elementSeparator = '__';
    bem.modifierSeparator = '_';
    bem.modifierValueSeparator = '_';

    // Methods.
    bem.block = function () {
        var parameters = arguments;

        if (parameters.length === 2 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string') {
            var blockName = cleanName(parameters[0]),
                modifier = parameters[1];

            if (isNullOrWhiteSpace(blockName)) {
                return '';
            }

            return blockName + ' ' + bem.blockModifier(blockName, modifier);
        }
        else if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string') {
            var blockName = parameters[0],
                modifier = parameters[1],
                cssClass = parameters[2];

            return bem.block(blockName, bem.splitModifiers(modifier), bem.splitCssClasses(cssClass));
        }
        else if (parameters.length === 2 && typeof parameters[0] === 'string' && $.isArray(parameters[1])) {
            var blockName = cleanName(parameters[0]),
                modifiers = parameters[1];

            if (isNullOrWhiteSpace(blockName)) {
                return '';
            }

            return blockName + ' ' + bem.blockModifier(blockName, modifiers);
        }
        else if (parameters.length === 3 && typeof parameters[0] === 'string' && $.isArray(parameters[1]) && $.isArray(parameters[2])) {
            var blockName = cleanName(parameters[0]),
                modifiers = parameters[1],
                cssClasses = parameters[2];

            if (isNullOrWhiteSpace(blockName)) {
                return '';
            }

            var resultingCssClass = new StringBuilder()
                .append(blockName)
                .append(' ');

            // Adding modifiers.
            if (modifiers.length > 0) {
                resultingCssClass.append(bem.blockModifier(blockName, modifiers));
                resultingCssClass.append(' ');
            }

            // Adding additional CSS classes.
            if (cssClasses.length > 0) {
                for (var i = 0; i < cssClasses.length; i++) {
                    if (!isNullOrWhiteSpace(cssClasses[i])) {
                        resultingCssClass.append(cssClasses[i]);
                        resultingCssClass.append(' ');
                    }
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return '';
    };

    bem.blockModifier = function () {
        var parameters = arguments;

        if (parameters.length === 2 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string') {
            var blockName = cleanName(parameters[0]),
                modifier = parameters[1];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(modifier)) {
                return '';
            }

            return bem.blockModifier(blockName, bem.splitModifiers(modifier));
        }
        else if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string') {
            var blockName = cleanName(parameters[0]),
                modifierName = cleanName(parameters[1]),
                modifierValue = cleanName(parameters[2]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(modifierName) || isNullOrWhiteSpace(modifierValue)) {
                return '';
            }

            return blockName + bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
        }
        else if (parameters.length === 2 && typeof parameters[0] === 'string' && $.isArray(parameters[1])) {
            var blockName = cleanName(parameters[0]),
                modifiers = parameters[1];

            if (isNullOrWhiteSpace(blockName) || modifiers.length === 0) {
                return '';
            }

            var resultingCssClass = new StringBuilder();

            for (var i = 0; i < modifiers.length; i++) {
                var modifier = modifiers[i];

                if (isNullOrWhiteSpace(modifier.name)) {
                    continue;
                }

                if (isNullOrWhiteSpace(modifier.value)) {
                    // Adding modifier without value.
                    resultingCssClass.append(blockName)
                        .append(bem.modifierSeparator)
                        .append(modifier.name)
                        .append(' ');
                }
                else {
                    // Adding modifier with value.
                    resultingCssClass.append(blockName)
                        .append(bem.modifierSeparator)
                        .append(modifier.name)
                        .append(bem.modifierValueSeparator)
                        .append(modifier.value)
                        .append(' ');
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return '';
    };

    bem.element = function () {
        var parameters = arguments;

        if (parameters.length === 2 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string') {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName)) {
                return '';
            }

            return blockName + bem.elementSeparator + elementName;
        }
        else if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string') {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]),
                modifier = parameters[2];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName)) {
                return '';
            }

            return blockName + bem.elementSeparator + elementName + ' ' + bem.elementModifier(blockName, elementName, modifier);
        }
        else if (parameters.length === 4 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string' && typeof parameters[3] === 'string') {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]),
                modifier = parameters[2],
                cssClass = parameters[3];

            return bem.element(blockName, elementName, bem.splitModifiers(modifier), bem.splitCssClasses(cssClass));
        }
        else if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && $.isArray(parameters[2])) {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]),
                modifiers = parameters[2];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || modifiers.length === 0) {
                return '';
            }

            return blockName + bem.elementSeparator + elementName + ' ' + bem.elementModifier(blockName, elementName, modifiers);
        }
        else if (parameters.length === 4 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && $.isArray(parameters[2]) && $.isArray(parameters[3])) {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]),
                modifiers = parameters[2],
                cssClasses = parameters[3];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName)) {
                return '';
            }

            var resultingCssClass = new StringBuilder()
                .append(blockName)
                .append(bem.elementSeparator)
                .append(elementName)
                .append(' ');

            // Adding modifiers.
            if (modifiers.length > 0) {
                resultingCssClass.append(bem.elementModifier(blockName, elementName, modifiers));
                resultingCssClass.append(' ');
            }

            // Adding additional CSS classes.
            if (cssClasses.length > 0) {
                for (var i = 0; i < cssClasses.length; i++) {
                    if (!isNullOrWhiteSpace(cssClasses[i])) {
                        resultingCssClass.append(cssClasses[i]);
                        resultingCssClass.append(' ');
                    }
                }
            }

            return $.trim(resultingCssClass.toString());
        }
    };

    bem.elementModifier = function () {
        var parameters = arguments;

        if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string') {
            var blockName = parameters[0],
                elementName = parameters[1],
                modifier = parameters[2];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || isNullOrWhiteSpace(modifier)) {
                return '';
            }

            return bem.elementModifier(blockName, elementName, bem.splitModifiers(modifier));
        }
        else if (parameters.length === 4 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string' && typeof parameters[3] === 'string') {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]),
                modifierName = cleanName(parameters[2]),
                modifierValue = cleanName(parameters[3]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || isNullOrWhiteSpace(modifierName) || isNullOrWhiteSpace(modifierValue)) {
                return '';
            }

            return blockName + bem.elementSeparator + elementName + bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
        }
        else if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && $.isArray(parameters[2])) {
            var blockName = cleanName(parameters[0]),
                elementName = cleanName(parameters[1]),
                modifiers = parameters[2];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || modifiers.length === 0) {
                return '';
            }

            var resultingCssClass = new StringBuilder();

            for (var i = 0; i < modifiers.length; i++) {
                var modifier = modifiers[i];
                modifier.name = cleanName(modifier.name);
                modifier.value = cleanName(modifier.value);

                if (isNullOrWhiteSpace(modifier.name)) {
                    continue;
                }

                if (isNullOrWhiteSpace(modifier.value)) {
                    // Adding modifier without value.
                    resultingCssClass.append(blockName)
                        .append(bem.elementSeparator)
                        .append(elementName)
                        .append(bem.modifierSeparator)
                        .append(modifier.name)
                        .append(' ');
                }
                else {
                    // Adding modifier with value.
                    resultingCssClass.append(blockName)
                        .append(bem.elementSeparator)
                        .append(elementName)
                        .append(bem.modifierSeparator)
                        .append(modifier.name)
                        .append(bem.modifierValueSeparator)
                        .append(modifier.value)
                        .append(' ');
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return '';
    };

    bem.getBlock = function () {
        var parameters = arguments;

        if (parameters.length === 1 && typeof parameters[0] === 'string') {
            return $('.' + $.trim(parameters[0]));
        }
        if (parameters.length === 2 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string') {
            return $('.' + bem.blockModifier(parameters[0], parameters[1]).replace(/\s/g, '.'));
        }
        if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string') {
            return $('.' + bem.blockModifier(parameters[0], parameters[1], parameters[2]).replace(/\s/g, '.'));
        }
        if (parameters.length === 2 && typeof parameters[0] === 'string' && typeof parameters[1] === 'object') {
            return $('.' + $.trim(parameters[0]), parameters[1]);
        }
        if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'object') {
            return $('.' + bem.blockModifier(parameters[0], parameters[1]).replace(/\s/g, '.'), parameters[2]);
        }
        if (parameters.length === 4 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string' && typeof parameters[3] === 'object') {
            return $('.' + bem.blockModifier(parameters[0], parameters[1], parameters[2]).replace(/\s/g, '.'), parameters[3]);
        }

        return $();
    };

    bem.getElement = function () {
        var parameters = arguments;

        if (parameters.length === 2 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string') {
            return $('.' + $.trim(parameters[0]) + bem.elementSeparator + $.trim(parameters[1]));
        }
        if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string') {
            return $('.' + bem.elementModifier(parameters[0], parameters[1], parameters[2]).replace(/\s/g, '.'));
        }
        if (parameters.length === 4 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string' && typeof parameters[3] === 'string') {
            return $('.' + bem.elementModifier(parameters[0], parameters[1], parameters[2], parameters[3]).replace(/\s/g, '.'));
        }
        if (parameters.length === 3 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'object') {
            return $('.' + $.trim(parameters[0]) + bem.elementSeparator + $.trim(parameters[1]), parameters[2]);
        }
        if (parameters.length === 4 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string' && typeof parameters[3] === 'object') {
            return $('.' + bem.elementModifier(parameters[0], parameters[1], parameters[2]).replace(/\s/g, '.'), parameters[3]);
        }
        if (parameters.length === 5 && typeof parameters[0] === 'string' && typeof parameters[1] === 'string' && typeof parameters[2] === 'string' && typeof parameters[3] === 'string' && typeof parameters[4] === 'object') {
            return $('.' + bem.elementModifier(parameters[0], parameters[1], parameters[2], parameters[3]).replace(/\s/g, '.'), parameters[4]);
        }

        return $();
    };

    bem.splitCssClasses = function (cssClasses) {
        /// <summary>
        /// Creates a list of CSS classes from the string.
        /// <para>Removes duplicate CSS classes.</para>
        /// </summary>
        /// <param name="cssClasses" type="String">One or more CSS classes, separated by a space.</param>
        /// <returns type="Array">A list of CSS classes.</returns>
        var newCssClasses = [];
        cssClasses = $.trim(cssClasses);

        if (!cssClasses) {
            return newCssClasses;
        }

        var splittedCssClasses = cssClasses.split(' ');

        for (var i = 0; i < splittedCssClasses.length; i++) {
            var cssClass = cleanName(splittedCssClasses[i]),
                cssClassExists = false;

            for (var j = 0; j < newCssClasses.length; j++) {
                if (cssClass === newCssClasses[j]) {
                    cssClassExists = true;
                    break;
                }
            }

            if (!isNullOrWhiteSpace(cssClass) && !cssClassExists) {
                newCssClasses.push(cssClass);
            }
        }

        return newCssClasses;
    };

    bem.splitModifiers = function (modifiers) {
        /// <summary>
        /// Creates a list of modifiers from the string.
        /// <para>If the string contains the same modifiers but with different values​​, then the value of the last modifier is taken.</para>
        /// </summary>
        /// <param name="modifiers" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="Array">A list of modifiers.</returns>
        var newModifiers = [];
        modifiers = $.trim(modifiers);

        if (!modifiers) {
            return newModifiers;
        }

        var splittedModifiers = modifiers.split(' ');

        for (var i = 0; i < splittedModifiers.length; i++) {
            var modifier = cleanName(splittedModifiers[i]),
                modifierParts = modifier.split(bem.modifierValueSeparator),
                modifierName = modifierParts[0],
                modifierValue = modifierParts.length === 2 ? modifierParts[1] : '',
                modifierExists = false;

            if (isNullOrWhiteSpace(modifierName) && isNullOrWhiteSpace(modifierValue)) {
                continue;
            }

            for (var j = 0; j < newModifiers.length; j++) {
                if (modifierName === newModifiers[j].name) {
                    newModifiers[j].value = modifierValue;
                    modifierExists = true;
                    break;
                }
            }

            if (!modifierExists) {
                newModifiers.push({
                    name: modifierName,
                    value: modifierValue
                });
            }
        }

        return newModifiers;
    };

    // Methods (private).
    function isNullOrWhiteSpace(value) {
        if (value === null || value === undefined) {
            return true;
        }

        return value.replace(/\s/g, '').length < 1;
    }

    /**
     * Removes the separators from the start and end of the string.
     * @param {string} value The string to clean.
     * @returns {string} A string cleaned from the separators.
     */
    function cleanName(value) {
        value = $.trim(value);

        // Remove separators from the start of the string.
        value = value.replace(new RegExp('^[' + bem.elementSeparator + bem.modifierSeparator + bem.modifierValueSeparator + ']+'), '');

        // Remove separators from the end of the string.
        value = value.replace(new RegExp('[' + bem.elementSeparator + bem.modifierSeparator + bem.modifierValueSeparator + ']+$'), '');

        return value;
    }

    // Nested types.
    function StringBuilder() {
        this.strings = [];

        this.append = function (value) {
            this.strings.push(value);
            return this;
        };

        this.toString = function () {
            return this.strings.join('');
        };
    }

    // Methods (jQuery).
    jQuery.fn.extend({
        addModifier: function () {
            for (var i = 0; i < this.length; i++) {
                var $element = $(this[i]);

                if ($element.isBlock()) {
                    $element.addClass(
                        bem.blockModifier.apply(null, [$element.blockName()].concat(Array.prototype.slice.call(arguments)))
                    );
                }
                else if ($element.isElement()) {
                    $element.addClass(
                        bem.elementModifier.apply(null, [$element.blockName(), $element.elementName()].concat(Array.prototype.slice.call(arguments)))
                    );
                }
            }

            return this;
        },

        blockName: function () {
            var cssClass = this.eq(0).attr('class'),
                firstCssClass = cssClass ? cssClass.split(' ')[0] : '';

            if (firstCssClass) {
                // Splitting in case if the current jQuery object is an element.
                return firstCssClass.split(bem.elementSeparator)[0];
            }

            return '';
        },

        elementName: function () {
            var cssClass = this.eq(0).attr('class'),
                firstCssClass = cssClass ? cssClass.split(' ')[0] : '';

            if (firstCssClass) {
                return firstCssClass.split(bem.elementSeparator)[1];
            }

            return '';
        },

        getBlock: function () {
            return bem.getBlock.apply(null, Array.prototype.slice.call(arguments).concat([this]));
        },

        getElement: function () {
            return bem.getElement.apply(null, [this.blockName()].concat(Array.prototype.slice.call(arguments), [this]));
        },

        hasModifier: function () {
            for (var i = 0; i < this.length; i++) {
                var $element = $(this[i]);

                if ($element.isBlock()) {
                    if ($element.hasClass(bem.blockModifier.apply(null, [$element.blockName()].concat(Array.prototype.slice.call(arguments))))) {
                        return true;
                    }
                }
                else if ($element.isElement()) {
                    if ($element.hasClass(bem.elementModifier.apply(null, [$element.blockName(), $element.elementName()].concat(Array.prototype.slice.call(arguments))))) {
                        return true;
                    }
                }
            }

            return false;
        },

        isBlock: function () {
            var cssClass = this.eq(0).attr('class'),
                firstCssClass = cssClass ? cssClass.split(' ')[0] : '';

            return !isNullOrWhiteSpace(firstCssClass) && firstCssClass.indexOf(bem.elementSeparator) === -1;
        },

        isElement: function () {
            var cssClass = this.eq(0).attr('class'),
                firstCssClass = cssClass ? cssClass.split(' ')[0] : '';

            return !isNullOrWhiteSpace(firstCssClass) && firstCssClass.indexOf(bem.elementSeparator) !== -1;
        },

        modifierValue: function (modifierName, modifierValue) {
            if (arguments.length === 1) {
                var cssClass = this.attr('class');

                if (!modifierName || !cssClass) {
                    return '';
                }

                var matches = new RegExp(bem.modifierSeparator + modifierName + bem.modifierValueSeparator + '([a-z0-9-]+)', 'ig').exec(cssClass);

                return matches ? matches[1] : '';
            }
            if (arguments.length === 2) {
                for (var i = 0; i < this.length; i++) {
                    var $element = $(this[i]),
                        cssClass = $element.attr('class');

                    if (!modifierName || !modifierValue || !cssClass) {
                        continue;
                    }

                    $element.attr(
                        'class',
                        cssClass.replace(
                            new RegExp(bem.modifierSeparator + modifierName + bem.modifierValueSeparator + '([a-z0-9-]+)', 'ig'),
                            function () {
                                return bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
                            }
                        )
                    );
                }

                return this;
            }
        },

        removeModifier: function () {
            for (var i = 0; i < this.length; i++) {
                var $element = $(this[i]);

                if ($element.isBlock()) {
                    $element.removeClass(
                        bem.blockModifier.apply(null, [$element.blockName()].concat(Array.prototype.slice.call(arguments)))
                    );
                }
                else if ($element.isElement()) {
                    $element.removeClass(
                        bem.elementModifier.apply(null, [$element.blockName(), $element.elementName()].concat(Array.prototype.slice.call(arguments)))
                    );
                }
            }

            return this;
        }
    });

    //// Solution for methods namespacing, e.g:
    //$('.product').bem().blockName();
    //
    //// Does not used for the sake of simplicity, e.g:
    //$('.product').blockName();
    //
    //var bemExtension = function () {
    //    var $element = this;
    //
    //    var methods = {
    //        blockName: function () {
    //            return '';
    //        }
    //    };
    //
    //    return methods;
    //}
    //
    //jQuery.fn.extend({ bem: bemExtension });
})(window.bem);