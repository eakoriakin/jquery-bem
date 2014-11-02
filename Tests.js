test("SplitCssClasses", function () {
    // Arrange.
    var serializedCssClasses = "h3 h1 h2 h1 h3";
    var expectedCssClasses = ["h3", "h1", "h2"]

    // Act.
    var actualCssClasses = bem.splitCssClasses(serializedCssClasses);

    // Act & Assert.
    deepEqual(actualCssClasses, expectedCssClasses, "Splits CSS-classes and removes duplicates.");
});