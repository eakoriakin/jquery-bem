$(function () {
    window.$html = $("#html");
});

test("block: Creates block CSS-class with modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.block("product", "is-selected is-focused size_xs"),
        "product product_is-selected product_is-focused product_size_xs"
    );
});

test("block: Creates block CSS-class with modifiers and CSS-classes", function () {
    // Act & Assert.
    strictEqual(
        bem.block("product", "is-selected is-focused size_xs", "clearfix"),
        "product product_is-selected product_is-focused product_size_xs clearfix"
    );
});

test("blockModifier: Creates block modifier CSS-class with multiple modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("product", "is-selected is-focused size_xs"),
        "product_is-selected product_is-focused product_size_xs"
    );
});

test("blockModifier: Creates block modifier CSS-class with a single modifier", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("product", "size", "xs"),
        "product_size_xs"
    );
});

test("element: Creates element CSS-class", function () {
    // Act & Assert.
    strictEqual(
        bem.element("product", "name"),
        "product__name"
    );
});

test("element: Creates element CSS-class with modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.element("product", "name", "is-selected is-focused size_xs"),
        "product__name product__name_is-selected product__name_is-focused product__name_size_xs"
    );
});

test("element: Creates element CSS-class with modifiers and CSS-classes", function () {
    // Act & Assert.
    strictEqual(
        bem.element("product", "name", "is-selected is-focused size_xs", "clearfix"),
        "product__name product__name_is-selected product__name_is-focused product__name_size_xs clearfix"
    );
});

test("elementModifier: Creates element modifier CSS-class with multiple modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("product", "name", "is-selected is-focused size_xs"),
        "product__name_is-selected product__name_is-focused product__name_size_xs"
    );
});

test("elementModifier: Creates element modifier CSS-class with a single modifier", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("product", "name", "size", "xs"),
        "product__name_size_xs"
    );
});

test("getBlock: Returns blocks by block name", function () {
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

test("getBlock: Returns blocks by block name and modifier", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product product_is-selected'></div>\
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

test("getBlock: Returns blocks by block name, modifier name and modifier value", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product product_size_xs'></div>\
        <div id='product3' class='product product_size'></div>\
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

test("getBlock: Returns blocks by block name and context", function () {
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

test("getBlock: Returns blocks by block name, modifier and context", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product product_is-selected'></div>\
        </div>\
        <div id='product4' class='product product_is-selected'></div>\
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

test("getBlock: Returns blocks by block name, modifier name, modifier value and context", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product product_size_xs'></div>\
            <div id='product4' class='product product_size'></div>\
        </div>\
        <div id='product5' class='product product_size_xs'></div>\
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

test("getElement: Returns elements by block name and element name", function () {
    // Arrange.
    var html = "\
        <div class='product'>\
            <div id='name1' class='product__name'></div>\
        </div>\
        <div class='product'>\
            <div id='name2' class='product__name'></div>\
        </div>\
    ";
    $html.html(html);

    // Act.
    var $elements = bem.getElement("product", "name");

    // Assert.
    ok(
        $elements.length === 2 &&
        $elements[0].id === "name1" &&
        $elements[1].id === "name2"
    );

    // Clean.
    $html.empty();
});

test("getElement: Returns elements by block name, element name and modifier", function () {
    // Arrange.
    var html = "\
        <div class='product'>\
            <div id='name1' class='product__name'></div>\
        </div>\
        <div class='product'>\
            <div id='name2' class='product__name product__name_is-selected'></div>\
        </div>\
    ";
    $html.html(html);

    // Act.
    var $elements = bem.getElement("product", "name", "is-selected");

    // Assert.
    ok(
        $elements.length === 1 &&
        $elements[0].id === "name2"
    );

    // Clean.
    $html.empty();
});

test("getElement: Returns elements by block name, element name, modifier name and modifier value", function () {
    // Arrange.
    var html = "\
        <div class='product'>\
            <div id='name1' class='product__name'></div>\
        </div>\
        <div class='product'>\
            <div id='name2' class='product__name product__name_size_xs'></div>\
        </div>\
        <div class='product'>\
            <div id='name3' class='product__name product__name_size'></div>\
        </div>\
    ";
    $html.html(html);

    // Act.
    var $elements = bem.getElement("product", "name", "size", "xs");

    // Assert.
    ok(
        $elements.length === 1 &&
        $elements[0].id === "name2"
    );

    // Clean.
    $html.empty();
});

test("getElement: Returns elements by block name, element name and context", function () {
    // Arrange.
    var html = "\
        <div class='product'>\
            <div id='name1' class='product__name'></div>\
        </div>\
        <div class='products'>\
            <div class='product'>\
                <div id='name2' class='product__name'></div>\
            </div>\
            <div class='product'>\
                <div id='name3' class='product__name'></div>\
            </div>\
        </div>\
        <div class='product'>\
            <div id='name4' class='product__name'></div>\
        </div>\
    ";
    $html.html(html);

    // Act.
    var $elements = bem.getElement("product", "name", $(".products"));

    // Assert.
    ok(
        $elements.length === 2 &&
        $elements[0].id === "name2" &&
        $elements[1].id === "name3"
    );

    // Clean.
    $html.empty();
});

test("getElement: Returns elements by block name, element name, modifier and context", function () {
    // Arrange.
    var html = "\
        <div class='product'>\
            <div id='name1' class='product__name'></div>\
        </div>\
        <div class='products'>\
            <div class='product'>\
                <div id='name2' class='product__name'></div>\
            </div>\
            <div class='product'>\
                <div id='name3' class='product__name product__name_is-selected'></div>\
            </div>\
        </div>\
        <div class='product'>\
            <div id='name4' class='product__name product__name_is-selected'></div>\
        </div>\
    ";
    $html.html(html);

    // Act.
    var $elements = bem.getElement("product", "name", "is-selected", $(".products"));

    // Assert.
    ok(
        $elements.length === 1 &&
        $elements[0].id === "name3"
    );

    // Clean.
    $html.empty();
});

test("getElement: Returns elements by block name, element name, modifier name, modifier value and context", function () {
    // Arrange.
    var html = "\
        <div class='product'>\
            <div id='name1' class='product__name'></div>\
        </div>\
        <div class='products'>\
            <div class='product'>\
                <div id='name2' class='product__name'></div>\
            </div>\
            <div class='product'>\
                <div id='name3' class='product__name product__name_size_xs'></div>\
            </div>\
            <div class='product'>\
                <div id='name4' class='product__name product__name_size'></div>\
            </div>\
        </div>\
        <div class='product'>\
            <div id='name5' class='product__name product__name_size_xs'></div>\
        </div>\
    ";
    $html.html(html);

    // Act.
    var $elements = bem.getElement("product", "name", "size", "xs", $(".products"));

    // Assert.
    ok(
        $elements.length === 1 &&
        $elements[0].id === "name3"
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

test("splitModifiers: Returns only the last modifier from multiple duplicates", function () {
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

test("$.fn.blockName: Returns the name of the block for the block", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    equal($(".product").blockName(), "product");

    // Clean.
    $html.empty();
});

test("$.fn.blockName: Returns the name of the block for the element", function () {
    // Arrange.
    var html = "\
        <div class='product__name product_name_is-selected'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    equal($(".product__name").blockName(), "product");

    // Clean.
    $html.empty();
});

test("$.fn.blockName: Returns an empty string if the DOM-element does have a class", function () {
    // Arrange.
    var html = "\
        <div id='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    equal($("#product").blockName(), "");

    // Clean.
    $html.empty();
});

test("$.fn.elementName: Returns the name of the element", function () {
    // Arrange.
    var html = "\
        <div class='product__name product_name_is-selected'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    equal($(".product__name").elementName(), "name");

    // Clean.
    $html.empty();
});

test("$.fn.elementName: Returns an empty string if the DOM-element does have a class", function () {
    // Arrange.
    var html = "\
        <div id='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    equal($("#product").elementName(), "");

    // Clean.
    $html.empty();
});