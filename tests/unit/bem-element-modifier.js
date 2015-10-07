describe('window.bem', function () {
    var bem = window.bem;

    describe('elementModifier method', function () {
        it('should create a CSS class of the element\'s modifier using the name of the block, the name of the element and a string of modifiers', function () {
            // Act & Assert.
            expect(
                bem.elementModifier('product', 'name', 'is-selected is-focused size_xs'))
                .toEqual('product__name_is-selected product__name_is-focused product__name_size_xs');
        });

        it('should create a CSS class of the element\'s modifier using the name of the block, the name of the element, the name of the modifier and the value of the modifier', function () {
            // Act & Assert.
            expect(
                bem.elementModifier('product', 'name', 'size', 'xs'))
                .toEqual('product__name_size_xs');
        });

        it('should create a CSS class of the element\'s modifier using the name of the block, the name of the element and a list of modifiers', function () {
            // Act & Assert.
            expect(
                bem.elementModifier('product', 'name', [{ name: 'is-selected' }, { name: 'is-focused' }, {
                    name: 'size',
                    value: 'xs'
                }]))
                .toEqual('product__name_is-selected product__name_is-focused product__name_size_xs');
        });
    });
});