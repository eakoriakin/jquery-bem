describe('$.fn', function () {
    describe('getBlock method', function () {
        it('should return blocks by the name of the block', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product"></div>\
                    <div class="offer"></div>\
                </div>\
                <div class="products">\
                    <div id="product4" class="product"></div>\
                </div>\
                <div id="product5" class="product"></div>\
            ');

            // Act.
            var $blocks = $('.products').getBlock('product');

            // Assert.
            expect($blocks.length).toEqual(3);
            expect($blocks[0].id).toEqual('product2');
            expect($blocks[1].id).toEqual('product3');
            expect($blocks[2].id).toEqual('product4');
        });

        it('should return blocks by the name of the block and the modifier', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product product_is-selected"></div>\
                    <div class="offer"></div>\
                </div>\
                <div class="products">\
                    <div id="product4" class="product product_is-selected"></div>\
                </div>\
                <div id="product5" class="product product_is-selected"></div>\
            ');

            // Act.
            var $blocks = $('.products').getBlock('product', 'is-selected');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product3');
            expect($blocks[1].id).toEqual('product4');
        });

        it('should return blocks by the name of the block and a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product product_is-selected product_size_xs"></div>\
                    <div class="offer"></div>\
                </div>\
                <div class="products">\
                    <div id="product4" class="product product_is-selected"></div>\
                    <div id="product5" class="product product_is-selected product_size_xs product_is-focused"></div>\
                </div>\
                <div id="product6" class="product product_is-selected product_size_xs"></div>\
            ');

            // Act.
            var $blocks = $('.products').getBlock('product', 'is-selected size_xs');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product3');
            expect($blocks[1].id).toEqual('product5');
        });

        it('should return blocks by the name of the block, the name of the modifier and the value of the modifier', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product product_size_xs"></div>\
                    <div id="product4" class="product product_size"></div>\
                    <div class="offer"></div>\
                </div>\
                <div class="products">\
                    <div id="product5" class="product product_size_xs"></div>\
                </div>\
                <div id="product6" class="product product_size_xs"></div>\
            ');

            // Act.
            var $blocks = $('.products').getBlock('product', 'size', 'xs');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product3');
            expect($blocks[1].id).toEqual('product5');
        });
    });
});