describe('window.bem', function () {
    var bem = window.bem;

    describe('block method', function () {
        it('should create a CSS class of the block using the name of the block and a string of modifiers', function () {
            // Act & Assert.
            expect(bem.block('product', 'is-selected is-focused size_xs'))
                .toEqual('product product_is-selected product_is-focused product_size_xs');
        });

        it('should create a CSS class of the block using the name of the block, a string of modifiers and a string of CSS classes', function () {
            // Act & Assert.
            expect(bem.block('product', 'is-selected is-focused size_xs', 'clearfix'))
                .toEqual('product product_is-selected product_is-focused product_size_xs clearfix');
        });

        it('should create a CSS class of the block using the name of the block and a list of modifiers', function () {
            // Act & Assert.
            expect(bem.block('product', [{ name: 'is-selected' }, { name: 'is-focused' }, {
                name: 'size',
                value: 'xs'
            }]))
                .toEqual('product product_is-selected product_is-focused product_size_xs');
        });

        it('should create a CSS class of the block using the name of the block, a list of modifiers and a list of CSS classes', function () {
            // Act & Assert.
            expect(bem.block('product', [{ name: 'is-selected' }, { name: 'is-focused' }, {
                name: 'size',
                value: 'xs'
            }], ['clearfix']))
                .toEqual('product product_is-selected product_is-focused product_size_xs clearfix');
        });
    });
});