describe('window.bem', function () {
    var bem = window.bem;

    describe('blockModifier method', function () {
        it('should create a CSS class of the block\'s modifier using the name of the block and a string of modifiers', function () {
            // Act & Assert.
            expect(
                bem.blockModifier('product', 'is-selected is-focused size_xs'))
                .toEqual('product_is-selected product_is-focused product_size_xs');
        });

        it('should create a CSS class of the block\'s modifier using the name of the block, the name of the modifier and the value of the modifier', function () {
            // Act & Assert.
            expect(
                bem.blockModifier('product', 'size', 'xs'))
                .toEqual('product_size_xs');
        });

        it('should create a CSS class of the block\'s modifier using the name of the block and a list of modifiers', function () {
            // Act & Assert.
            expect(
                bem.blockModifier('product', [{ name: 'is-selected' }, { name: 'is-focused' }, {
                    name: 'size',
                    value: 'xs'
                }]))
                .toEqual('product_is-selected product_is-focused product_size_xs');
        });
    });
});