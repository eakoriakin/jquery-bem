test("blockModifier", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("block", "is-enabled is-focused size_xs"),
        "block_is-enabled block_is-focused block_size_xs",
        "Creates block modifier CSS-class with multiple modifiers."
    );
});

test("blockModifier", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("block", "size", "xs"),
        "block_size_xs",
        "Creates block modifier CSS-class with single modifier with value."
    );
});

test("splitCssClasses", function () {
    // Arrange.
    var serializedCssClasses = "h3 h1 h2 h1 h3";
    var expectedCssClasses = ["h3", "h1", "h2"]

    // Act.
    var actualCssClasses = bem.splitCssClasses(serializedCssClasses);

    // Assert.
    deepEqual(actualCssClasses, expectedCssClasses, "Splits CSS-classes and removes duplicates.");
});

test("splitModifiers", function () {
    // Arrange.
    var serializedModifiers = "is-selected size_xs is-focused";
    var expectedModifiers = [
        { name: "is-selected", value: "" },
        { name: "size", value: "xs" },
        { name: "is-focused", value: "" }
    ];

    // Act.
    var actualModifiers = bem.splitModifiers(serializedModifiers);

    // Assert.
    deepEqual(actualModifiers, expectedModifiers, "Splits modifiers.");
});

test("splitModifiers", function () {
    // Arrange.
    var serializedModifiers = "is-selected size_xs is-focused size_m is-selected";
    var expectedModifiers = [
        { name: "is-selected", value: "" },
        { name: "size", value: "m" },
        { name: "is-focused", value: "" }
    ];

    // Act.
    var actualModifiers = bem.splitModifiers(serializedModifiers);

    // Assert.
    deepEqual(actualModifiers, expectedModifiers, "Gets only the last modifier from multiple duplicates.");
});