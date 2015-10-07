module.exports = function (config) {
    config.set({
        basePath: './../../../',
        autoWatch: true,
        frameworks: [
            'jasmine'
        ],
        browsers: [
            'Chrome'
        ],
        files: [
            'node_modules/jquery/dist/jquery.js',
            'node_modules/jasmine-jquery/lib/jasmine-jquery.js',
            'source/bem.js',
            'tests/unit/bem-block.js',
            'tests/unit/bem-block-modifier.js',
            'tests/unit/bem-element.js',
            'tests/unit/bem-element-modifier.js',
            'tests/unit/bem-get-block.js',
            'tests/unit/bem-get-element.js',
            'tests/unit/bem-split-css-classes.js',
            'tests/unit/bem-split-modifiers.js',
            'tests/unit/fn-add-modifier.js',
            'tests/unit/fn-block-name.js',
            'tests/unit/fn-element-name.js',
            'tests/unit/fn-get-block.js',
            'tests/unit/fn-get-element.js',
            'tests/unit/fn-is-block.js',
            'tests/unit/fn-is-element.js',
            'tests/unit/fn-modifier-value.js',
            'tests/unit/fn-has-modifier.js',
            'tests/unit/fn-remove-modifier.js'
        ]
    });
};