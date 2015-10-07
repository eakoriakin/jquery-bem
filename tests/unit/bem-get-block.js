describe('window.bem', function () {
    var bem = window.bem;

    describe('getBlock method', function () {
        it('should return blocks by the name of the block', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="offer"></div>\
                <div id="product2" class="product"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product1');
            expect($blocks[1].id).toEqual('product2');
        });

        it('should return blocks by the name of the block and the modifier', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div id="product2" class="product product_is-selected"></div>\
                <div class="offer"></div>\
                <div id="product3" class="product product_is-selected"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', 'is-selected');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product2');
            expect($blocks[1].id).toEqual('product3');
        });

        it('should return blocks by the name of the block and a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div id="product2" class="product product_is-selected product_size_xs"></div>\
                <div class="offer"></div>\
                <div id="product3" class="product product_is-selected"></div>\
                <div id="product4" class="product product_is-selected product_size_xs product_is-focused"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', 'is-selected size_xs');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product2');
            expect($blocks[1].id).toEqual('product4');
        });

        it('should return blocks by the name of the block, the name of the modifier and the value of the modifier', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="offer"></div>\
                <div id="product2" class="product product_size_xs"></div>\
                <div id="product3" class="product product_size"></div>\
                <div id="product4" class="product product_size_xs"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', 'size', 'xs');

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product2');
            expect($blocks[1].id).toEqual('product4');
        });

        it('should return blocks by the name of the block and the context', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product"></div>\
                    <div class="offer"></div>\
                </div>\
                <div id="product4" class="product"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', $('.products'));

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product2');
            expect($blocks[1].id).toEqual('product3');
        });

        it('should return blocks by the name of the block, the modifier and the context', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product product_is-selected"></div>\
                    <div class="offer"></div>\
                    <div id="product4" class="product product_is-selected"></div>\
                </div>\
                <div id="product5" class="product product_is-selected"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', 'is-selected', $('.products'));

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product3');
            expect($blocks[1].id).toEqual('product4');
        });

        it('should return blocks by the name of the block, a string of modifiers and the context', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product product_is-selected product_size_xs"></div>\
                    <div class="offer"></div>\
                    <div id="product4" class="product product_is-selected"></div>\
                    <div id="product5" class="product product_is-selected product_size_xs product_is-focused"></div>\
                </div>\
                <div id="product5" class="product product_is-selected"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', 'is-selected size_xs', $('.products'));

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product3');
            expect($blocks[1].id).toEqual('product5');
        });

        it('should return blocks by the name of the block, the name of the modifier, the value of the modifier and the context', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div class="products">\
                    <div id="product2" class="product"></div>\
                    <div id="product3" class="product product_size_xs"></div>\
                    <div id="product4" class="product product_size"></div>\
                    <div id="product5" class="product product_size_xs"></div>\
                    <div class="offer"></div>\
                </div>\
                <div id="product6" class="product product_size_xs"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('product', 'size', 'xs', $('.products'));

            // Assert.
            expect($blocks.length).toEqual(2);
            expect($blocks[0].id).toEqual('product3');
            expect($blocks[1].id).toEqual('product5');
        });

        it('should return an empty list if no blocks are found', function () {
            // Arrange.
            setFixtures('\
                <div id="product1" class="product"></div>\
                <div id="product2" class="product"></div>\
            ');

            // Act.
            var $blocks = bem.getBlock('offer');

            // Assert.
            expect($blocks.length).toEqual(0);
        });
    });
});