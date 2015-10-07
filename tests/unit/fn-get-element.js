describe('$.fn', function () {
    describe('getElement method', function () {
        it('should return elements by the name of the element', function () {
            // Arrange.
            setFixtures('\
                <div id="name1" class="product__name"></div>\
                <div class="product">\
                    <div id="name2" class="product__name"></div>\
                    <div class="product__price"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name"></div>\
                </div>\
                <div id="name4" class="product__name"></div>\
            ');

            // Act.
            var $elements = $('.product').getElement('name');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name2');
            expect($elements[1].id).toEqual('name3');
        });

        it('should return elements by the name of the element and the modifier', function () {
            // Arrange.
            setFixtures('\
                <div id="name1" class="product__name"></div>\
                <div class="product">\
                    <div id="name2" class="product__name"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name product__name_is-selected"></div>\
                    <div class="product__price"></div>\
                </div>\
                <div class="product">\
                    <div id="name4" class="product__name product__name_is-selected"></div>\
                </div>\
                <div id="name5" class="product__name product__name_is-selected"></div>\
            ');

            // Act.
            var $elements = $('.product').getElement('name', 'is-selected');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name3');
            expect($elements[1].id).toEqual('name4');
        });

        it('should return elements by the name of the element and a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div id="name1" class="product__name"></div>\
                <div class="product">\
                    <div id="name2" class="product__name"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name product__name_is-selected product__name_size_xs"></div>\
                    <div class="product__price"></div>\
                </div>\
                <div class="product">\
                    <div id="name4" class="product__name product__name_is-selected"></div>\
                    <div id="name5" class="product__name product__name_is-selected product__name_size_xs product__name_is-focused"></div>\
                </div>\
                <div id="name6" class="product__name product__name_is-selected product__name_size_xs"></div>\
            ');

            // Act.
            var $elements = $('.product').getElement('name', 'is-selected size_xs');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name3');
            expect($elements[1].id).toEqual('name5');
        });

        it('should return elements by the name of the element, the name of the modifier and the value of the modifier', function () {
            // Arrange.
            setFixtures('\
                <div id="name1" class="product__name"></div>\
                <div class="product">\
                    <div id="name2" class="product__name"></div>\
                </div>\
                <div class="product">\
                    <div id="name3" class="product__name product__name_size_xs"></div>\
                    <div class="product__price"></div>\
                </div>\
                <div class="product">\
                    <div id="name4" class="product__name product__name_size_xs"></div>\
                    <div id="name5" class="product__name product__name_size"></div>\
                </div>\
                <div id="name6" class="product__name product__name_size_xs"></div>\
            ');

            // Act.
            var $elements = $('.product').getElement('name', 'size', 'xs');

            // Assert.
            expect($elements.length).toEqual(2);
            expect($elements[0].id).toEqual('name3');
            expect($elements[1].id).toEqual('name4');
        });
    });
});