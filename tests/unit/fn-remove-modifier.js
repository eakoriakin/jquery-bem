describe('$.fn', function () {
    describe('removeModifier method', function () {
        it('should remove modifiers defined as a string from a set of blocks', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_is-selected product_is-focused product_size_xs"></div>\
                <div class="product product_is-selected product_is-focused product_size_xs"></div>\
            ');

            // Act.
            var $products = $('.product').removeModifier('is-selected is-focused size_xs');

            // Assert.
            expect($products.eq(0).attr('class')).toEqual('product');
            expect($products.eq(1).attr('class')).toEqual('product');
        });

        it('should remove the modifier with name and value from a set of blocks', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_size_xs"></div>\
                <div class="product product_size_xs"></div>\
            ');

            // Act.
            var $products = $('.product').removeModifier('size', 'xs');

            // Assert.
            expect($products.eq(0).attr('class')).toEqual('product');
            expect($products.eq(1).attr('class')).toEqual('product');
        });

        it('should remove modifiers defined as a list from a set of blocks', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_is-selected product_is-focused product_size_xs"></div>\
                <div class="product product_is-selected product_is-focused product_size_xs"></div>\
            ');

            // Act.
            var $products = $('.product').removeModifier([{ name: 'is-selected' }, { name: 'is-focused' }, {
                name: 'size',
                value: 'xs'
            }]);

            // Assert.
            expect($products.eq(0).attr('class')).toEqual('product');
            expect($products.eq(1).attr('class')).toEqual('product');
        });

        it('should remove modifiers defined as a string from a set of elements', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_is-selected product__name_is-focused product__name_size_xs"></div>\
                <div class="product__name product__name_is-selected product__name_is-focused product__name_size_xs"></div>\
            ');

            // Act.
            var $names = $('.product__name').removeModifier('is-selected is-focused size_xs');

            // Assert.
            expect($names.eq(0).attr('class')).toEqual('product__name');
            expect($names.eq(1).attr('class')).toEqual('product__name');
        });

        it('should remove the modifier with name and value from a set of elements', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_size_xs"></div>\
                <div class="product__name product__name_size_xs"></div>\
            ');

            // Act.
            var $names = $('.product__name').removeModifier('size', 'xs');

            // Assert.
            expect($names.eq(0).attr('class')).toEqual('product__name');
            expect($names.eq(1).attr('class')).toEqual('product__name');
        });

        it('should remove modifiers defined as a list from a set of elements', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_is-selected product__name_is-focused product__name_size_xs"></div>\
                <div class="product__name product__name_is-selected product__name_is-focused product__name_size_xs"></div>\
            ');

            // Act.
            var $names = $('.product__name').removeModifier([{ name: 'is-selected' }, { name: 'is-focused' }, {
                name: 'size',
                value: 'xs'
            }]);

            // Assert.
            expect($names.eq(0).attr('class')).toEqual('product__name');
            expect($names.eq(1).attr('class')).toEqual('product__name');
        });

        it('should retain chaining', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product product_is-selected"></div>\
                <div id="product2" class="product product_is-selected"></div>\
            ');

            // Act.
            var $products = $('.product').removeModifier('is-selected');

            // Assert.
            expect($products.length).toEqual(2);
            expect($products[0].id).toEqual('product1');
            expect($products[1].id).toEqual('product2');
        });

        it('should retain other classes', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_is-selected clearfix"></div>\
            ');

            // Act.
            var $products = $('.product').removeModifier('is-selected');

            // Assert.
            expect($products.length).toEqual(1);
            expect($products.eq(0).attr('class')).toEqual('product clearfix');
        });
    });
});