$(function () {
    // Bem static members.
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
        /// Creates block CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="String">Block CSS-class.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates block CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <param name="cssClass" type="String">One or more additional CSS-classes, separated by a space.</param>
        /// <returns type="String">Block CSS-class.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates block CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifiers" type="Array">List of modifiers.</param>
        /// <returns type="String">Block CSS-class.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates block CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifiers" type="Array">List of modifiers.</param>
        /// <param name="cssClasses" type="Array">List of CSS-classes.</param>
        /// <returns type="String">Block CSS-class.</returns>
        /// </signature>
        if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            var blockName = $.trim(arguments[0]),
                modifier = $.trim(arguments[1]);

            if (isNullOrWhiteSpace(blockName)) {
                return "";
            }

            return blockName + " " + bem.blockModifier(blockName, modifier);
        }
        else if (arguments.length === 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            var blockName = $.trim(arguments[0]),
                modifier = $.trim(arguments[1]),
                cssClass = $.trim(arguments[2]);

            return bem.block(blockName, bem.splitModifiers(modifier), bem.splitCssClasses(cssClass));
        }
        else if (arguments.length === 2 && typeof arguments[0] === "string" && $.isArray(arguments[1])) {
            var blockName = $.trim(arguments[0]),
                modifiers = arguments[1];

            if (isNullOrWhiteSpace(blockName)) {
                return "";
            }

            return blockName + " " + bem.blockModifier(blockName, modifiers);
        }
        else if (arguments.length === 3 && typeof arguments[0] === "string" && $.isArray(arguments[1]) && $.isArray(arguments[2])) {
            var blockName = $.trim(arguments[0]),
                modifiers = arguments[1],
                cssClasses = arguments[2];

            if (isNullOrWhiteSpace(blockName)) {
                return "";
            }

            var resultingCssClass = new StringBuilder()
                .append(blockName + " ");

            // Adding modifiers.
            if (modifiers.length > 0) {
                resultingCssClass.append(bem.blockModifier(blockName, modifiers) + " ");
            }

            // Adding additional CSS-classes.
            if (cssClasses.length > 0) {
                for (var i = 0; i < cssClasses.length; i++) {
                    if (!isNullOrWhiteSpace(cssClasses[i])) {
                        resultingCssClass.append(cssClasses[i] + " ");
                    }
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return "";
    };

    bem.blockModifier = function () {
        /// <signature>
        /// <summary>
        /// Creates block modifier CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
        /// <returns type="String">Block modifier CSS-class.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates block modifier CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifierName" type="String">Modifier name.</param>
        /// <param name="modifierValue" type="String">Modifier value.</param>
        /// <returns type="String">Block modifier CSS-class.</returns>
        /// </signature>
        /// <signature>
        /// <summary>
        /// Creates block modifier CSS-class.
        /// </summary>
        /// <param name="blockName" type="String">Block name.</param>
        /// <param name="modifiers" type="Array">List of modifiers.</param>
        /// <returns type="String">Block modifier CSS-class.</returns>
        /// </signature>
        if (arguments.length === 2 && typeof arguments[0] === "string" && typeof arguments[1] === "string") {
            var blockName = $.trim(arguments[0]),
                modifier = $.trim(arguments[1]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(modifier)) {
                return "";
            }

            return bem.blockModifier(blockName, bem.splitModifiers(modifier));
        }
        else if (arguments.length === 3 && typeof arguments[0] === "string" && typeof arguments[1] === "string" && typeof arguments[2] === "string") {
            var blockName = $.trim(arguments[0]),
                modifierName = $.trim(arguments[1]),
                modifierValue = $.trim(arguments[2]);

            if (isNullOrWhiteSpace(blockName) || isNullOrWhiteSpace(modifierName) || isNullOrWhiteSpace(modifierValue)) {
                return "";
            }

            return blockName + bem.modifierSeparator + modifierName + bem.modifierValueSeparator + modifierValue;
        }
        else if (arguments.length === 2 && typeof arguments[0] === "string" && $.isArray(arguments[1])) {
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
                    resultingCssClass.append(blockName + bem.modifierSeparator + modifier.name + " ");
                }

                else {
                    resultingCssClass.append(blockName + bem.modifierSeparator + modifier.name + bem.modifierValueSeparator + modifier.value + " ");
                }
            }

            return $.trim(resultingCssClass.toString());
        }

        return "";
    };

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
    };

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
    };

    // Bem jQuery-extension.
    var bemExtension = function () {
        var $element = this;

        var methods = {
            getElement: function (elementName) {
                var blockName = $element.attr("class");

                return $("." + blockName + bem.elementSeparator + elementName);
            }
        };

        return methods;
    };

    jQuery.fn.extend({ bem: bemExtension });
});