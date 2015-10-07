describe('window.bem', function () {
    var bem = window.bem;

    describe('element method', function () {
        it('should create a CSS class of the element using the name of the block and the name of the element', function () {
            // Act & Assert.
            expect(
                bem.element('product', 'name'))
                .toEqual('product__name');
        });

        it('should create a CSS class of the element using the name of the block, the name of the element and a string of modifiers', function () {
            // Act & Assert.
            expect(
                bem.element('product', 'name', 'is-selected is-focused size_xs'))
                .toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs');
        });

        it('should create a CSS class of the element using the name of the block, the name of the element, a string of modifiers and a string of CSS classes', function () {
            // Act & Assert.
            expect(
                bem.element('product', 'name', 'is-selected is-focused size_xs', 'clearfix'))
                .toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs clearfix');
        });

        it('should create a CSS class of the element using the name of the block, the name of the element and a list of modifiers', function () {
            // Act & Assert.
            expect(
                bem.element('product', 'name', [{ name: 'is-selected' }, { name: 'is-focused' }, {
                    name: 'size',
                    value: 'xs'
                }]))
                .toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs');
        });

        it('should create a CSS class of the element using the name of the block, the name of the element, a list of modifiers and a list of CSS classes', function () {
            // Act & Assert.
            expect(
                bem.element('product', 'name', [{ name: 'is-selected' }, { name: 'is-focused' }, {
                    name: 'size',
                    value: 'xs'
                }], ['clearfix']))
                .toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs clearfix');
        });
    });
});