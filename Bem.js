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
        /// Gets a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Gets a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">The modifier.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Gets a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifierName" type="String">The name of the modifier.</param>
        /// <param name="modifierValue" type="String">The value of the modifier.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Gets a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="context" type="jQuery">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Gets a collection of matched blocks.
        /// </summary>
        /// <param name="blockName" type="String">The name of the block.</param>
        /// <param name="modifier" type="String">The modifier.</param>
        /// <param name="context" type="jQuery">A DOM-element or jQuery-object to search in.</param>
        /// <returns type="jQuery-объект">A collection of matched blocks if there are any; otherwise - an empty collection.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Gets a collection of matched blocks.
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

    // jQuery-extension.
    var bemExtension = function () {
        var $element = this;

        var methods = {
            getElement: function (elementName) {
                var blockName = $element.attr("class");

                return $("." + blockName + bem.elementSeparator + elementName);
            }
        };

        return methods;
    }

    jQuery.fn.extend({ bem: bemExtension });
});