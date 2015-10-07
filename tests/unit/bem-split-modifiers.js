describe('window.bem', function () {
    var bem = window.bem;

    describe('splitModifiers method', function () {
        it('should ignore extra spaces', function () {
            // Arrange.
            var serializedModifiers = ' is-selected   size_xs     is-focused  ',
                expectedModifiers = [
                    { name: 'is-selected', value: '' },
                    { name: 'size', value: 'xs' },
                    { name: 'is-focused', value: '' }
                ];

            // Act.
            var actualModifiers = bem.splitModifiers(serializedModifiers);

            // Assert.
            expect(actualModifiers).toEqual(expectedModifiers);
        });

        it('should split modifiers', function () {
            // Arrange.
            var serializedModifiers = 'is-selected size_xs is-focused',
                expectedModifiers = [
                    { name: 'is-selected', value: '' },
                    { name: 'size', value: 'xs' },
                    { name: 'is-focused', value: '' }
                ];

            // Act.
            var actualModifiers = bem.splitModifiers(serializedModifiers);

            // Assert.
            expect(actualModifiers).toEqual(expectedModifiers);
        });

        it('should return only the last modifier from multiple duplicates', function () {
            // Arrange.
            var serializedModifiers = 'is-selected size_xs is-focused size_m is-selected',
                expectedModifiers = [
                    { name: 'is-selected', value: '' },
                    { name: 'size', value: 'm' },
                    { name: 'is-focused', value: '' }
                ];

            // Act.
            var actualModifiers = bem.splitModifiers(serializedModifiers);

            // Assert.
            expect(actualModifiers).toEqual(expectedModifiers);
        });
    });
});