describe('$.fn', function () {
    describe('elementName method', function () {
        it('should return the name of the element', function () {
            // Arrange.
            setFixtures('\
                 <div class="product__name product_name_is-selected"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').elementName()).toEqual('name');
        });

        it('should return an empty string if the DOM-element does have a class', function () {
            // Arrange.
            setFixtures('\
                 <div id="product"></div>\
            ');

            // Act & Assert.
            expect($('#product').elementName()).toEqual('');
        });
    });
});