describe('window.bem', function () {
    var bem = window.bem;

    describe('getElement method', function () {
        it('should return elements by the name of the block and the name of the element', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                    <div class="product__price"></div>\
                </div>\
                <div class="product">\
                    <div id="name2" class="product__name"></div>\
                    <div class="product__price"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name1');
            expect($elements[1].id).toEqual('name2');
        });

        it('should return elements by the name of the block, the name of the element and the modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                    <div id="name2" class="product__name product__name_is-selected"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name product__name_is-selected"></div>\
                    <div class="product__price"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', 'is-selected');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name2');
            expect($elements[1].id).toEqual('name3');
        });

        it('should return elements by the name of the block, the name of the element and a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                    <div id="name2" class="product__name product__name_is-selected product__name_size_xs"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name product__name_is-selected"></div>\
                    <div id="name4" class="product__name product__name_is-selected product__name_size_xs product__name_is-focused"></div>\
                    <div class="product__price"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', 'is-selected size_xs');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name2');
            expect($elements[1].id).toEqual('name4');
        });

        it('should return elements by the name of the block, the name of the element, the name of the modifier and the value of the modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                    <div id="name2" class="product__name product__name_size_xs"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name product__name_size_xs"></div>\
                </div>\
                <div class="product">\
                    <div id="name4" class="product__name product__name_size"></div>\
                    <div class="product__price"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', 'size', 'xs');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name2');
            expect($elements[1].id).toEqual('name3');
        });

        it('should return elements by the name of the block, the name of the element and the context', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                </div>\
                <div class="products">\
                    <div class="product">\
                        <div id="name2" class="product__name"></div>\
                    </div>\
                    <div class="product">\
                        <div id="name3" class="product__name"></div>\
                        <div class="product__price"></div>\
                    </div>\
                </div>\
                <div class="product">\
                    <div id="name4" class="product__name"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', $('.products'));

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name2');
            expect($elements[1].id).toEqual('name3');
        });

        it('should return elements by the name of the block, the name of the element, the modifier and the context', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                </div>\
                <div class="products">\
                    <div class="product">\
                        <div id="name2" class="product__name"></div>\
                        <div id="name3" class="product__name product__name_is-selected"></div>\
                    </div>\
                    <div class="product">\
                        <div id="name4" class="product__name product__name_is-selected"></div>\
                        <div class="product__price"></div>\
                    </div>\
                </div>\
                <div class="product">\
                    <div id="name5" class="product__name product__name_is-selected"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', 'is-selected', $('.products'));

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name3');
            expect($elements[1].id).toEqual('name4');
        });

        it('should return elements by the name of the block, the name of the element, a string of modifiers and the context', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                </div>\
                <div class="products">\
                    <div class="product">\
                        <div id="name2" class="product__name"></div>\
                        <div id="name3" class="product__name product__name_is-selected product__name_size_xs"></div>\
                    </div>\
                    <div class="product">\
                        <div id="name4" class="product__name product__name_is-selected"></div>\
                        <div id="name5" class="product__name product__name_is-selected product__name_size_xs product__name_is-focused"></div>\
                        <div class="product__price"></div>\
                    </div>\
                </div>\
                <div class="product">\
                    <div id="name6" class="product__name product__name_is-selected product__name_size_xs"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', 'is-selected size_xs', $('.products'));

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name3');
            expect($elements[1].id).toEqual('name5');
        });

        it('should return elements by the name of the block, the name of the element, the name of the modifier, the value of the modifier and the context', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                </div>\
                <div class="products">\
                    <div class="product">\
                        <div id="name2" class="product__name"></div>\
                        <div id="name3" class="product__name product__name_size_xs"></div>\
                    </div>\
                    <div class="product">\
                        <div id="name4" class="product__name product__name_size_xs"></div>\
                    </div>\
                    <div class="product">\
                        <div id="name5" class="product__name product__name_size"></div>\
                    </div>\
                </div>\
                <div class="product">\
                    <div id="name6" class="product__name product__name_size_xs"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'name', 'size', 'xs', $('.products'));

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name3');
            expect($elements[1].id).toEqual('name4');
        });

        it('should return an empty list if no elements are found', function () {
            // Arrange.
            setFixtures('\
                <div class="product">\
                    <div id="name1" class="product__name"></div>\
                </div>\
                <div class="product">\
                    <div id="name2" class="product__name"></div>\
                </div>\
            ');

            // Act.
            var $elements = bem.getElement('product', 'price');

            // Assert.
            expect($elements.length).toEqual(0);
        });
    });
});