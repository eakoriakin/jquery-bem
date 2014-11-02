$(function () {
    // Bem static members.
    var bem = {};
    window.bem = bem;

    bem.elementSeparator = "__";
    bem.modifierSeparator = "_";
    bem.modifierValueSeparator = "_";

    //bem.block = function (blockName, modifier, cssClass) {
    //    /// <summary>
    //    /// Creates block CSS-class.
    //    /// </summary>
    //    /// <param name="blockName" type="String">Block name.</param>
    //    /// <param name="modifier" type="String">One or more modifiers, separated by a space.</param>
    //    /// <param name="cssClass" type="String">One or more additional CSS-classes, separated by a space.</param>
    //    /// <returns type="String">Block CSS-class.</returns>
    //    if (!blockName) {
    //        return "";
    //    }

    //    blockName = $.trim(blockName);
    //    modifier = $.trim(modifier);
    //    cssClass = $.trim(cssClass);

    //    var modifiers = modifier.split(" "),
    //        cssClasses = cssClass.split(" ");

    //    var resultingCssClass = blockName + " ";

    //    // Adding modifiers.
    //    for (var i = 0; i < modifiers.length; i++) {
    //        var trimmedModifier = $.trim(modifiers[i]);

    //        if (trimmedModifier) {
    //            resultingCssClass += blockName + "_" + trimmedModifier + " ";
    //        }
    //    }

    //    // Adding additional CSS-classes.
    //    for (var i = 0; i < cssClasses.length; i++) {
    //        var trimmedCssClass = $.trim(cssClasses[i]);

    //        if (trimmedCssClass) {
    //            resultingCssClass += trimmedCssClass + " ";
    //        }
    //    }

    //    return $.trim(resultingCssClass);
    //};

    bem.splitCssClasses = function (cssClasses) {
    	/// <summary>
        /// Creates list of CSS-classes from string.
        /// <para>Removes duplicate CSS-classes.</para>
    	/// </summary>
        /// <param name="cssClasses" type="String">One or more CSS-classes, separated by a space.</param>
        /// <returns type="Array">List of CSS-classes.</returns>
        var newCssClasses = [];

        if (!cssClasses) {
            return newCssClasses;
        }

        var splittedCssClasses = $.trim(cssClasses).split(" ");

        for (var i = 0; i < splittedCssClasses.length; i++) {
            var cssClass = splittedCssClasses[i],
                cssClassExists = false;
            
            for (var j = 0; j < newCssClasses.length; j++) {
                if (cssClass === newCssClasses[j]) {
                    cssClassExists = true;
                    break;
                }
            }

            if (cssClass && !cssClassExists) {
                newCssClasses.push(cssClass);
            }
        }

        return newCssClasses;
    }

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