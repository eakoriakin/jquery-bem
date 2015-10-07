describe('$.fn', function () {
    describe('hasModifier method', function () {
        it('should return false if none of the set of blocks has all modifiers from a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_is-selected product_size_xs"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier('is-selected size_m')).toEqual(false);
        });

        it('should return false if none of the set of blocks has the modifier with name and value', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_size_xs"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier('size', 'm')).toEqual(false);
        });

        it('should return false if none of the set of blocks has all modifiers from a list of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product product_is-selected product_size_xs"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier([{ name: 'is-selected' }, { name: 'size', value: 'm' }])).toEqual(false);
        });

        it('should return false if none of the set of elements has all modifiers from a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_is-selected product__name_size_xs"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier('is-selected size_m')).toEqual(false);
        });

        it('should return false if none of the set of elements has the modifier with name and value', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_size_xs"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier('size', 'm')).toEqual(false);
        });

        it('should return false if none of the set of elements has all modifiers from a list of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name product__name_is-selected product__name_size_xs"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier([{ name: 'is-selected' }, {
                name: 'size',
                value: 'm'
            }])).toEqual(false);
        });

        it('should return true if any of the set of blocks has the modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product product_is-selected"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier('is-selected')).toEqual(true);
        });

        it('should return true if any of the set of blocks has all modifiers from a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product product_is-selected product_size_xs"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier('is-selected size_xs')).toEqual(true);
        });

        it('should return true if any of the set of blocks has the modifier with name and value', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product product_size_xs"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier('size', 'xs')).toEqual(true);
        });

        it('should return true if any of the set of blocks has all modifiers from a list of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product"></div>\
                <div class="product product_is-selected product_size_xs"></div>\
                <div class="product"></div>\
            ');

            // Act & Assert.
            expect($('.product').hasModifier([{ name: 'is-selected' }, { name: 'size', value: 'xs' }])).toEqual(true);
        });

        it('should return true if any of the set of elements has the modifier', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name product__name_is-selected"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier('is-selected')).toEqual(true);
        });

        it('should return true if any of the set of elements has all modifiers from a string of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name product__name_is-selected product__name_size_xs"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier('is-selected size_xs')).toEqual(true);
        });

        it('should return true if any of the set of elements has the modifier with name and value', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name product__name_size_xs"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier('size', 'xs')).toEqual(true);
        });

        it('should return true if any of the set of elements has all modifiers from a list of modifiers', function () {
            // Arrange.
            setFixtures('\
                <div class="product__name"></div>\
                <div class="product__name product__name_is-selected product__name_size_xs"></div>\
                <div class="product__name"></div>\
            ');

            // Act & Assert.
            expect($('.product__name').hasModifier([{ name: 'is-selected' }, {
                name: 'size',
                value: 'xs'
            }])).toEqual(true);
        });
    });
});