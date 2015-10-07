describe('$.fn', function () {
    describe('addModifier method', function () {
        it('should add modifiers defined as a string to a set of blocks', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product"></div>\
            ');

            // Act.
            var $products = $('.product').addModifier('is-selected is-focused size_xs');

            // Assert.
            expect($products.eq(0).attr('class')).toEqual('product product_is-selected product_is-focused product_size_xs');
            expect($products.eq(1).attr('class')).toEqual('product product_is-selected product_is-focused product_size_xs');
        });

        it('should add the modifier with name and value to a set of blocks', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product"></div>\
            ');

            // Act.
            var $products = $('.product').addModifier('size', 'xs');

            // Assert.
            expect($products.eq(0).attr('class')).toEqual('product product_size_xs');
            expect($products.eq(1).attr('class')).toEqual('product product_size_xs');
        });

        it('should add modifiers defined as a list to a set of blocks', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product"></div>\
            ');

            // Act.
            var $products = $('.product').addModifier([{ name: 'is-selected' }, { name: 'is-focused' }, {
                name: 'size',
                value: 'xs'
            }]);

            // Assert.
            expect($products.eq(0).attr('class')).toEqual('product product_is-selected product_is-focused product_size_xs');
            expect($products.eq(1).attr('class')).toEqual('product product_is-selected product_is-focused product_size_xs');
        });

        it('should add modifiers defined as a string to a set of elements', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name"></div>\
            ');

            // Act.
            var $names = $('.product__name').addModifier('is-selected is-focused size_xs');

            // Assert.
            expect($names.eq(0).attr('class')).toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs');
            expect($names.eq(1).attr('class')).toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs');
        });

        it('should add the modifier with name and value to a set of elements', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name"></div>\
            ');

            // Act.
            var $names = $('.product__name').addModifier('size', 'xs');

            // Assert.
            expect($names.eq(0).attr('class')).toEqual('product__name product__name_size_xs');
            expect($names.eq(1).attr('class')).toEqual('product__name product__name_size_xs');
        });

        it('should add modifiers defined as a list to a set of elements', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name"></div>\
            ');

            // Act.
            var $names = $('.product__name').addModifier([{ name: 'is-selected' }, { name: 'is-focused' }, {
                name: 'size',
                value: 'xs'
            }]);

            // Assert.
            expect($names.eq(0).attr('class')).toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs');
            expect($names.eq(1).attr('class')).toEqual('product__name product__name_is-selected product__name_is-focused product__name_size_xs');
        });

        it('should add the modifier only to blocks and elements, ignoring other jQuery-objects', function () {
            // Arrange.
            setFixtures('\
                <div id="product1"></div>\
                <div class="product"></div>\
                <div class="product">\
                    <div class="product__name"></div>\
                </div>\
            ');

            var $objects = $('#product1, .product, .product__name');

            // Act.
            $objects.addModifier('is-selected');

            // Assert.
            expect($objects.eq(0).attr('class')).toEqual(undefined);
            expect($objects.eq(1).attr('class')).toEqual('product product_is-selected');
            expect($objects.eq(2).attr('class')).toEqual('product product_is-selected');
            expect($objects.eq(3).attr('class')).toEqual('product__name product__name_is-selected');
        });

        it('should retain chaining', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div id="product2" class="product"></div>\
            ');

            // Act.
            var $products = $('.product').addModifier('is-selected');

            // Assert.
            expect($products.length).toEqual(2);
            expect($products[0].id).toEqual('product1');
            expect($products[1].id).toEqual('product2');
        });
    });
});