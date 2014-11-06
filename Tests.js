$(function () {
    window.$html = $("#html");
});

test("block: Creates block CSS-class with modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.block("block", "is-enabled is-focused size_xs"),
        "block block_is-enabled block_is-focused block_size_xs"
    );
});

test("block: Creates block CSS-class with modifiers and CSS-classes", function () {
    // Act & Assert.
    strictEqual(
        bem.block("block", "is-enabled is-focused size_xs", "clearfix"),
        "block block_is-enabled block_is-focused block_size_xs clearfix"
    );
});

test("blockModifier: Creates block modifier CSS-class with multiple modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("block", "is-enabled is-focused size_xs"),
        "block_is-enabled block_is-focused block_size_xs"
    );
});

test("blockModifier: Creates block modifier CSS-class with a single modifier", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("block", "size", "xs"),
        "block_size_xs"
    );
});

test("element: Creates element CSS-class", function () {
    // Act & Assert.
    strictEqual(
        bem.element("block", "element"),
        "block__element"
    );
});

test("element: Creates element CSS-class with modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.element("block", "element", "is-enabled is-focused size_xs"),
        "block__element block__element_is-enabled block__element_is-focused block__element_size_xs"
    );
});

test("element: Creates element CSS-class with modifiers and CSS-classes", function () {
    // Act & Assert.
    strictEqual(
        bem.element("block", "element", "is-enabled is-focused size_xs", "clearfix"),
        "block__element block__element_is-enabled block__element_is-focused block__element_size_xs clearfix"
    );
});

test("elementModifier: Creates element modifier CSS-class with multiple modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("block", "element", "is-enabled is-focused size_xs"),
        "block__element_is-enabled block__element_is-focused block__element_size_xs"
    );
});

test("elementModifier: Creates element modifier CSS-class with a single modifier", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("block", "element", "size", "xs"),
        "block__element_size_xs"
    );
});

test("getBlock: Gets blocks by block name", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = bem.getBlock("product");

    // Assert.
    ok(
        $blocks.length === 2 &&
        $blocks[0].id === "product1" &&
        $blocks[1].id === "product2"
    );

    // Clean.
    $html.empty();
});

test("getBlock: Gets blocks by block name and modifier", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product_is-selected'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = bem.getBlock("product", "is-selected");

    // Assert.
    ok(
        $blocks.length === 1 &&
        $blocks[0].id === "product2"
    );

    // Clean.
    $html.empty();
});

test("getBlock: Gets blocks by block name, modifier name and modifier value", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product_size_xs'></div>\
        <div id='product3' class='product_size'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = bem.getBlock("product", "size", "xs");

    // Assert.
    ok(
        $blocks.length === 1 &&
        $blocks[0].id === "product2"
    );

    // Clean.
    $html.empty();
});

test("getBlock: Gets blocks by block name and context", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product'></div>\
        </div>\
        <div id='product4' class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = bem.getBlock("product", $(".products"));

    // Assert.
    ok(
        $blocks.length === 2 &&
        $blocks[0].id === "product2" &&
        $blocks[1].id === "product3"
    );

    // Clean.
    $html.empty();
});

test("getBlock: Gets blocks by block name, modifier and context", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product_is-selected'></div>\
        </div>\
        <div id='product4' class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = bem.getBlock("product", "is-selected", $(".products"));

    // Assert.
    ok(
        $blocks.length === 1 &&
        $blocks[0].id === "product3"
    );

    // Clean.
    $html.empty();
});

test("getBlock: Gets blocks by block name, modifier name, modifier value and context", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product_size_xs'></div>\
            <div id='product4' class='product_size'></div>\
        </div>\
        <div id='product5' class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = bem.getBlock("product", "size", "xs", $(".products"));

    // Assert.
    ok(
        $blocks.length === 1 &&
        $blocks[0].id === "product3"
    );

    // Clean.
    $html.empty();
});

test("splitCssClasses: Splits CSS-classes and removes duplicates", function () {
    // Arrange.
    var serializedCssClasses = "h3 h1 h2 h1 h3";
    var expectedCssClasses = ["h3", "h1", "h2"]

    // Act.
    var actualCssClasses = bem.splitCssClasses(serializedCssClasses);

    // Assert.
    deepEqual(actualCssClasses, expectedCssClasses);
});

test("splitModifiers: Splits modifiers", function () {
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
    deepEqual(actualModifiers, expectedModifiers);
});

test("splitModifiers: Gets only the last modifier from multiple duplicates", function () {
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
    deepEqual(actualModifiers, expectedModifiers);
});