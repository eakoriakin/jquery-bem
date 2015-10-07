describe('window.bem', function () {
    var bem = window.bem;

    describe('splitCssClasses method', function () {
        it('should ignore extra spaces', function () {
            // Act & Assert.
            expect(bem.splitCssClasses('  h1     h2  h3 ')).toEqual(['h1', 'h2', 'h3']);
        });

        it('should split CSS classes and remove duplicates', function () {
            // Act & Assert.
            expect(bem.splitCssClasses('h3 h1 h2 h1 h3')).toEqual(['h3', 'h1', 'h2']);
        });
    });
});