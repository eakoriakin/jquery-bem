describe('$.fn', function () {
    describe('blockName method', function () {
        it('should return the name of the block', function () {
            // Arrange.
            setFixtures('\
                 <div class="product product_is-selected"></div>\
            ');

            // Act & Assert.
            expect($('.product').blockName()).toEqual('product');
        });

        it('should return the name of the element\'s block', function () {
            // Arrange.
            setFixtures('\
                 <div class="product__name product_name_is-selected"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').blockName()).toEqual('product');
        });

        it('should return an empty string if the DOM-element does have a class', function () {
            // Arrange.
            setFixtures('\
                 <div id="product"></div>\
            ');

            // Act & Assert.
            expect($('#product').blockName()).toEqual('');
        });
    });
});