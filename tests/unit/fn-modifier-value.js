describe('$.fn', function () {
    describe('modifierValue method', function () {
        it('should return the value of the block\'s modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_size_xs"></div>\
                <div class="product product_size_m"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').modifierValue('size')).toEqual('xs');
        });

        it('should return the value of the element\'s modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_size_xs"></div>\
                <div class="product__name product__name_size_m"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').modifierValue('size')).toEqual('xs');
        });

        it('should return an empty string if the block does not have the modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product product__name_size_xs"></div>\
            ');

            // Act & Assert.
            expect($('.product').modifierValue('size')).toEqual('');
        });

        it('should return an empty string if the element does not have the modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name product__name_size_xs"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').modifierValue('size')).toEqual('');
        });

        it('should set the value of the modifier of a set of blocks and retain chaining', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div id="product2" class="product product_size_xs"></div>\
                <div id="product3" class="product product_size_xs"></div>\
            ');

            // Act.
            var $products = $('.product').modifierValue('size', 'm');

            // Assert.
            expect($products.length).toEqual(3);
            expect($products[0].id).toEqual('product1');
            expect($products[1].id).toEqual('product2');
            expect($products[2].id).toEqual('product3');
            expect($products.eq(0).attr('class')).toEqual('product');
            expect($products.eq(1).attr('class')).toEqual('product product_size_m');
            expect($products.eq(2).attr('class')).toEqual('product product_size_m');
        });

        it('should set the value of the modifier of a set of elements and retain chaining', function () {
            // Arrange.
            setFixtures('\
                <div id="name1" class="product_name"></div>\
                <div id="name2" class="product_name product_name_size_xs"></div>\
                <div id="name3" class="product_name product_name_size_xs"></div>\
            ');

            // Act.
            var $products = $('.product_name').modifierValue('size', 'm');

            // Assert.
            expect($products.length).toEqual(3);
            expect($products[0].id).toEqual('name1');
            expect($products[1].id).toEqual('name2');
            expect($products[2].id).toEqual('name3');
            expect($products.eq(0).attr('class')).toEqual('product_name');
            expect($products.eq(1).attr('class')).toEqual('product_name product_name_size_m');
            expect($products.eq(2).attr('class')).toEqual('product_name product_name_size_m');
        });
    });
});