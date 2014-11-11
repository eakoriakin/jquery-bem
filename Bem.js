/*!
 * BEM-library for JavaScript and jQuery v1.0.0.
 * http://kea.eqwad.com/bem-for-js
 *
 * Copyright (c) 2014 Evgeny A. Koryakin.
 * Released under the MIT license.
 * https://github.com/eakoryakin/BemForJS/blob/master/LICENSE
 *
 * Date: 2014-11-11T18:05Z
 * 
 * Dependencies:
 *  - jQuery v1.4.0
 */
$(function () {
    var bem = {};
    window.bem = bem;

    // Fields.
    bem.elementSeparator = "__";
    bem.modifierSeparator = "_";
    bem.modifierValueSeparator = "_";

    // Methods.
    bem.block = function () {
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="String">A CSS-class of the block.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <param name="cssClass" type="String">One or more additional CSS-classes, separated by a space.</param>
        /// <returns type="String">A CSS-class of the block.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifiers" type="Array">A list of modifiers.</param>
        /// <returns type="String">A CSS-class of the block.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifiers" type="Array">A list of modifiers.</param>
        /// <param name="cssClasses" type="Array">A list of CSS-classes.</param>
        /// <returns type="String">A CSS-class of the block.</returns>
        /// </signature>
        if (arguments.length == 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            var blockName = $.trim(arguments[0]),
                modifier = $.trim(arguments[1]);

            if (isNullOrWhiteSpace(blockName)) {
                return "";
            }

            return blockName + " " + bem.blockModifier(blockName, modifier);
        }
        else if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            var blockName = $.trim(arguments[0]),
                modifier = $.trim(arguments[1]),
                cssClass = $.trim(arguments[2]);

            return bem.block(blockName, bem.splitModifiers(modifier), bem.splitCssClasses(cssClass));
        }
        else if (arguments.length == 2 && typeof arguments[0] === "string" && $.isArray(arguments[1])) {
            var blockName = $.trim(arguments[0]),
                modifiers = arguments[1];

            if (isNullOrWhiteSpace(blockName)) {
                return "";
            }

            return blockName + " " + bem.blockModifier(blockName, modifiers);
        }
        else if (arguments.length == 3 && typeof arguments[0] === "string" && $.isArray(arguments[1]) && $.isArray(arguments[2])) {
            var blockName = $.trim(arguments[0]),
                modifiers = arguments[1],
                cssClasses = arguments[2];

            if (isNullOrWhiteSpace(blockName)) {
                return "";
            }

            var resultingCssClass = new StringBuilder()
                .append(blockName)
                .append(" ");

            // Adding modifiers.
            if (modifiers.length > 0) {
                resultingCssClass.append(bem.blockModifier(blockName, modifiers));
                resultingCssClass.append(" ");
            }

            // Adding additional CSS-classes.
            if (cssClasses.length > 0) {
                for (var i = 0; i < cssClasses.length; i++) {
                    if (!isNullOrWhiteSpace(cssClasses[i])) {
                        resultingCssClass.append(cssClasses[i]);
                        resultingCssClass.append(" ");
                    }
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return "";
    }

    bem.blockModifier = function () {
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block's modifier.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="String">A CSS-class of the block's modifier.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block's modifier.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <returns type="String">A CSS-class of the block's modifier.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the block's modifier.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifiers" type="Array">A list of modifiers.</param>
        /// <returns type="String">A CSS-class of the block's modifier.</returns>
        /// </signature>
        if (arguments.length == 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            var blockName = $.trim(arguments[0]),
                modifier = $.trim(arguments[1]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(modifier)) {
                return "";
            }

            return bem.blockModifier(blockName, bem.splitModifiers(modifier));
        }
        else if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            var blockName = $.trim(arguments[0]),
                modifierName = $.trim(arguments[1]),
                modifierValue = $.trim(arguments[2]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(modifierName) || isNullOrWhiteSpace(modifierValue)) {
                return "";
            }

            return blockName + bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
        }
        else if (arguments.length == 2 && typeof arguments[0] === "string" && $.isArray(arguments[1])) {
            var blockName = $.trim(arguments[0]),
                modifiers = arguments[1];

            if (isNullOrWhiteSpace(blockName) || modifiers.length == 0) {
                return "";
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
                        .append(" ");
                }
                else {
                    // Adding modifier with value.
                    resultingCssClass.append(blockName)
                        .append(bem.modifierSeparator)
                        .append(modifier.name)
                        .append(bem.modifierValueSeparator)
                        .append(modifier.value)
                        .append(" ");
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return "";
    }

    bem.element = function () {
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <returns type="String">A CSS-class of the element.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="String">A CSS-class of the element.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <param name="cssClass" type="String">One or more additional CSS-classes, separated by a space.</param>
        /// <returns type="String">A CSS-class of the element.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifiers" type="Array">A list of modifiers.</param>
        /// <returns type="String">A CSS-class of the element.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifiers" type="Array">A list of modifiers.</param>
        /// <param name="cssClasses" type="Array">A list of CSS-classes.</param>
        /// <returns type="String">A CSS-class of the element.</returns>
        /// </signature>
        if (arguments.length == 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName)) {
                return "";
            }

            return blockName + bem.elementSeparator + elementName;
        }
        else if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifier = $.trim(arguments[2]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName)) {
                return "";
            }

            return blockName + bem.elementSeparator + elementName + " " + bem.elementModifier(blockName, elementName, modifier);
        }
        else if (arguments.length == 4 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string" && typeof arguments[3] === "string") {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifier = $.trim(arguments[2]),
                cssClass = $.trim(arguments[3]);

            return bem.element(blockName, elementName, bem.splitModifiers(modifier), bem.splitCssClasses(cssClass));
        }
        else if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && $.isArray(arguments[2])) {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifiers = arguments[2];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || modifiers.length == 0) {
                return "";
            }

            return blockName + bem.elementSeparator + elementName + " " + bem.elementModifier(blockName, elementName, modifiers);
        }
        else if (arguments.length == 4 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && $.isArray(arguments[2]) && $.isArray(arguments[3])) {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifiers = arguments[2],
                cssClasses = arguments[3];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName)) {
                return "";
            }

            var resultingCssClass = new StringBuilder()
                .append(blockName)
                .append(bem.elementSeparator)
                .append(elementName)
                .append(" ");

            // Adding modifiers.
            if (modifiers.length > 0) {
                resultingCssClass.append(bem.elementModifier(blockName, elementName, modifiers));
                resultingCssClass.append(" ");
            }

            // Adding additional CSS-classes.
            if (cssClasses.length > 0) {
                for (var i = 0; i < cssClasses.length; i++) {
                    if (!isNullOrWhiteSpace(cssClasses[i])) {
                        resultingCssClass.append(cssClasses[i]);
                        resultingCssClass.append(" ");
                    }
                }
            }

            return $.trim(resultingCssClass.toString());
        }
    }

    bem.elementModifier = function () {
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element's modifier.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="String">A CSS-class of the element's modifier.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element's modifier.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <returns type="String">A CSS-class of the element's modifier.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates a CSS-class of the element's modifier.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifiers" type="Array">A list of modifiers.</param>
        /// <returns type="String">A CSS-class of the element's modifier.</returns>
        /// </signature>
        if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifier = $.trim(arguments[2]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || isNullOrWhiteSpace(modifier)) {
                return "";
            }

            return bem.elementModifier(blockName, elementName, bem.splitModifiers(modifier));
        }
        else if (arguments.length == 4 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string" && typeof arguments[3] === "string") {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifierName = $.trim(arguments[2]),
                modifierValue = $.trim(arguments[3]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || isNullOrWhiteSpace(modifierName) || isNullOrWhiteSpace(modifierValue)) {
                return "";
            }

            return blockName + bem.elementSeparator + elementName + bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
        }
        else if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && $.isArray(arguments[2])) {
            var blockName = $.trim(arguments[0]),
                elementName = $.trim(arguments[1]),
                modifiers = arguments[2];

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(elementName) || modifiers.length == 0) {
                return "";
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
                        .append(bem.elementSeparator)
                        .append(elementName)
                        .append(bem.modifierSeparator)
                        .append(modifier.name)
                        .append(" ");
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
                        .append(" ");
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return "";
    }

    bem.getBlock = function () {
        /// <signature>
        /// <summary>
        /// Returns a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">The modifier.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="context" type="jQuery">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">The modifier.</param>
        /// <param name="context" type="jQuery">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <param name="context" type="jQuery">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        if (arguments.length == 1 && typeof arguments[0] === "string") {
            return $("." + $.trim(arguments[0]));
        }
        if (arguments.length == 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            return $("." + bem.blockModifier(arguments[0], arguments[1]));
        }
        if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            return $("." + bem.blockModifier(arguments[0], arguments[1], arguments[2]));
        }
        if (arguments.length == 2 && typeof arguments[0] === "string" && typeof arguments[1] === "object") {
            return $("." + $.trim(arguments[0]), arguments[1]);
        }
        if (arguments.length == 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "object") {
            return $("." + bem.blockModifier(arguments[0], arguments[1]), arguments[2]);
        }
        if (arguments.length == 4 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string" && typeof arguments[3] === "object") {
            return $("." + bem.blockModifier(arguments[0], arguments[1], arguments[2]), arguments[3]);
        }

        return $();
    }

    bem.getElement = function () {
        /// <signature>
        /// <summary>
        /// Returns a collection of matched elements.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched elements.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifier" type="String">The modifier.</param>
        /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched elements.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched elements.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="context" type="Element">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched elements.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifier" type="String">The modifier.</param>
        /// <param name="context" type="Element">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Returns a collection of matched elements.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="elementName" type="String">The name of the element.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <param name="context" type="Element">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            return $("." + $.trim(arguments[0]) + bem.elementSeparator + $.trim(arguments[1]));
        }
        if (arguments.length === 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            return $("." + bem.elementModifier(arguments[0], arguments[1], arguments[2]));
        }
        if (arguments.length === 4 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string" && typeof arguments[3] === "string") {
            return $("." + bem.elementModifier(arguments[0], arguments[1], arguments[2], arguments[3]));
        }
        if (arguments.length === 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "object") {
            return $("." + $.trim(arguments[0]) + bem.elementSeparator + $.trim(arguments[1]), arguments[2]);
        }
        if (arguments.length === 4 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string" && typeof arguments[3] === "object") {
            return $("." + bem.elementModifier(arguments[0], arguments[1], arguments[2]), arguments[3]);
        }
        if (arguments.length === 5 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string" && typeof arguments[3] === "string" && typeof arguments[4] === "object") {
            return $("." + bem.elementModifier(arguments[0], arguments[1], arguments[2], arguments[3]), arguments[4]);
        }

        return $();
    }

    bem.splitCssClasses = function (cssClasses) {
        /// <summary>
        /// Creates a list of CSS-classes from the string.
        /// <para>Removes duplicate CSS-classes.</para>
        /// </summary>
        /// <param name="cssClasses" type="String">One or more CSS-classes, separated by a space.</param>
        /// <returns type="Array">A list of CSS-classes.</returns>
        var newCssClasses = [];
        cssClasses = $.trim(cssClasses);

        if (!cssClasses) {
            return newCssClasses;
        }

        var splittedCssClasses = cssClasses.split(" ");

        for (var i = 0; i < splittedCssClasses.length; i++) {
            var cssClass = splittedCssClasses[i],
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
    }

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

        var splittedModifiers = modifiers.split(" ");

        for (var i = 0; i < splittedModifiers.length; i++) {
            var modifier = splittedModifiers[i],
                modifierParts = modifier.split(bem.modifierValueSeparator),
                modifierName = modifierParts[0],
                modifierValue = modifierParts.length == 2 ? modifierParts[1] : "",
                modifierExists = false;

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
    }

    // Methods (private).
    function isNullOrWhiteSpace(value) {
        if (value === null || value === undefined) {
            return true;
        }

        return value.replace(/\s/g, '').length < 1;
    }

    // Nested types.
    function StringBuilder() {
        this.strings = [];

        this.append = function (value) {
            this.strings.push(value);
            return this;
        };

        this.toString = function () {
            return this.strings.join("");
        }
    }

    // jQuery-extensions.
    jQuery.fn.extend({

        addModifier: function () {
            /// <signature>
            /// <summary>
            /// Adds the modifier(s) to each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Adds the modifier to each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifierName" type="String">The name of the modifier.</param>
            /// <param name="modifierValue" type="String">The value of the modifier.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Adds the modifier(s) to each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifiers" type="Array">A list of modifiers.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
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
            /// <summary>
            /// Returns the name of the first block of the set of jQuery-objects.
            /// <para>The name of the block is taken from the first CSS-class.</para>
            /// </summary>
            /// <returns type="String">The name of the block.</returns>
            var cssClass = this.eq(0).attr("class"),
                firstCssClass = cssClass ? cssClass.split(" ")[0] : "";

            if (firstCssClass) {
                // Splitting in case if the current jQuery-object is an element.
                return firstCssClass.split(bem.elementSeparator)[0];
            }

            return "";
        },

        elementName: function () {
            /// <summary>
            /// Returns the name of the first element of the set of jQuery-objects.
            /// <para>The name of the element is taken from the first CSS-class.</para>
            /// </summary>
            /// <returns type="String">The name of the element.</returns>
            var cssClass = this.eq(0).attr("class"),
                firstCssClass = cssClass ? cssClass.split(" ")[0] : "";

            if (firstCssClass) {
                return firstCssClass.split(bem.elementSeparator)[1];
            }

            return "";
        },

        getBlock: function () {
            /// <signature>
            /// <summary>
            /// Returns a collection of matched blocks, containing in the currunt set of jQuery-objects.
            /// </summary>
            /// <param name="blockName" type="String">The name of the block.</param>
            /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Returns a collection of matched blocks, containing in the currunt set of jQuery-objects.
            /// </summary>
            /// <param name="blockName" type="String">The name of the block.</param>
            /// <param name="modifier" type="String">The modifier.</param>
            /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Returns a collection of matched blocks, containing in the currunt set of jQuery-objects.
            /// </summary>
            /// <param name="blockName" type="String">The name of the block.</param>
            /// <param name="modifierName" type="String">The name of the modifier.</param>
            /// <param name="modifierValue" type="String">The value of the modifier.</param>
            /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
            /// </signature>
            return bem.getBlock.apply(null, Array.prototype.slice.call(arguments).concat([this]));
        },

        getElement: function () {
            /// <signature>
            /// <summary>
            /// Returns a collection of matched elements, containing in the currunt set of jQuery-objects.
            /// <para>The name of the block for the element is taken each time from the jQuery-object in the currunt set of jQuery-objects.</para>
            /// </summary>
            /// <param name="elementName" type="String">The name of the element.</param>
            /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Returns a collection of matched elements, containing in the currunt set of jQuery-objects.
            /// <para>The name of the block for the element is taken each time from the jQuery-object in the currunt set of jQuery-objects.</para>
            /// </summary>
            /// <param name="elementName" type="String">The name of the element.</param>
            /// <param name="modifier" type="String">The modifier.</param>
            /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Returns a collection of matched elements, containing in the currunt set of jQuery-objects.
            /// <para>The name of the block for the element is taken each time from the jQuery-object in the currunt set of jQuery-objects.</para>
            /// </summary>
            /// <param name="elementName" type="String">The name of the element.</param>
            /// <param name="modifierName" type="String">The name of the modifier.</param>
            /// <param name="modifierValue" type="String">The value of the modifier.</param>
            /// <returns type="jQuery-объект">A collection of matched elements if there are any; otherwise - an empty collection.</returns>
            /// </signature>
            return bem.getElement.apply(null, [this.blockName()].concat(Array.prototype.slice.call(arguments), [this]));
        },

        hasModifier: function () {
            /// <signature>
            /// <summary>
            /// Determines whether any of the set of jQuery-objects has the given modifier.
            /// </summary>
            /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
            /// <returns type="Boolean">True if any of the set of jQuery-objects has the given modifier; otherwise - false.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Determines whether any of the set of jQuery-objects has the given modifier.
            /// </summary>
            /// <param name="modifierName" type="String">The name of the modifier.</param>
            /// <param name="modifierValue" type="String">The value of the modifier.</param>
            /// <returns type="Boolean">True if any of the set of jQuery-objects has the given modifier; otherwise - false.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Determines whether any of the set of jQuery-objects has the given modifier.
            /// </summary>
            /// <param name="modifiers" type="Array">A list of modifiers.</param>
            /// <returns type="Boolean">True if any of the set of jQuery-objects has the given modifier; otherwise - false.</returns>
            /// </signature>
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
            /// <summary>
            /// Determines whether the first jQuery-object of the set of jQuery-objects is a block.
            /// </summary>
            /// <returns type="Boolean">True if the first jQuery-object is a block; otherwise - false.</returns>
            var cssClass = this.eq(0).attr("class"),
                firstCssClass = cssClass ? cssClass.split(" ")[0] : "";

            if (firstCssClass && firstCssClass.indexOf(bem.elementSeparator) === -1) {
                return true;
            }

            return false;
        },

        isElement: function () {
            /// <summary>
            /// Determines whether the first jQuery-object of the set of jQuery-objects is an element.
            /// </summary>
            /// <returns type="Boolean">True if the first jQuery-object is an element; otherwise - false.</returns>
            var cssClass = this.eq(0).attr("class"),
                firstCssClass = cssClass ? cssClass.split(" ")[0] : "";

            if (firstCssClass && firstCssClass.indexOf(bem.elementSeparator) != -1) {
                return true;
            }

            return false;
        },

        modifierValue: function (modifierName, modifierValue) {
            /// <signature>
            /// <summary>
            /// Returns the value of the modifier of the first block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifierName" type="String">The name of the modifier.</param>
            /// <returns type="String">The value of the modifier.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Sets the value of the modifier of each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifierName">The name of the modifier.</param>
            /// <param name="modifierValue">The value of the modifier.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
            if (arguments.length === 1) {
                var cssClass = this.attr("class");

                if (!modifierName || !cssClass) {
                    return "";
                }

                var matches = new RegExp(bem.modifierSeparator + modifierName + bem.modifierValueSeparator + "([a-z0-9-]+)", "ig").exec(cssClass);

                return matches ? matches[1] : "";
            }
            if (arguments.length === 2) {
                var cssClass = this.attr("class");

                if (!modifierName || !modifierValue || !cssClass) {
                    return this;
                }

                this.attr(
                    "class",
                    cssClass.replace(
                        new RegExp(bem.modifierSeparator + modifierName + bem.modifierValueSeparator + "([a-z0-9-]+)", "ig"),
                        function () {
                            return bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
                        }
                    )
                );

                return this;
            }
        },

        removeModifier: function () {
            /// <signature>
            /// <summary>
            /// Removes the modifier(s) from each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Removes the modifier from each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifierName" type="String">The name of the modifier.</param>
            /// <param name="modifierValue" type="String">The value of the modifier.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
            /// <signature>
            /// <summary>
            /// Removes the modifier(s) from each block or element of the set of jQuery-objects.
            /// </summary>
            /// <param name="modifiers" type="Array">A list of modifiers.</param>
            /// <returns type="jQuery-object">The set of jQuery-objects.</returns>
            /// </signature>
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

    /*
        Solution for methods namespacing, e.g:
        $(".product").bem().blockName();

        Does not used for the sake of simplicity, e.g:
        $(".product").blockName();

        var bemExtension = function () {
            var $element = this;

            var methods = {
                blockName: function () {
                    return "";
                }
            };

            return methods;
        }

        jQuery.fn.extend({ bem: bemExtension });
    */
});