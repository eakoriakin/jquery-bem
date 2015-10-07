describe('$.fn', function () {
    describe('isBlock method', function () {
        it('should return true if the jQuery-object is a block', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').isBlock()).toEqual(true);
        });

        it('should return false if the jQuery-object is not a block', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').isBlock()).toEqual(false);
        });

        it('should return false if the jQuery-object does not have a CSS class', function () {
            // Arrange.
            setFixtures('\
                <div id="product"></div>\
            ');

            // Act & Assert.
            expect($('#product').isBlock()).toEqual(false);
        });
    });
});