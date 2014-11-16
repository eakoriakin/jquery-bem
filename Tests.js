$(function () {
    window.$html = $("#html");
});

test("block: Creates a CSS-class of the block with modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.block("product", "is-selected is-focused size_xs"),
        "product product_is-selected product_is-focused product_size_xs"
    );
});

test("block: Creates a CSS-class of the block with modifiers and CSS-classes", function () {
    // Act & Assert.
    strictEqual(
        bem.block("product", "is-selected is-focused size_xs", "clearfix"),
        "product product_is-selected product_is-focused product_size_xs clearfix"
    );
});

test("blockModifier: Creates a CSS-class of the block's modifier with multiple modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("product", "is-selected is-focused size_xs"),
        "product_is-selected product_is-focused product_size_xs"
    );
});

test("blockModifier: Creates a CSS-class of the block's modifier with the modifier name and the modifier value", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("product", "size", "xs"),
        "product_size_xs"
    );
});

test("blockModifier: Creates a CSS-class of the block's modifier with a list of modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.blockModifier("product", [{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]),
        "product_is-selected product_is-focused product_size_xs"
    );
});

test("element: Creates a CSS-class of the element", function () {
    // Act & Assert.
    strictEqual(
        bem.element("product", "name"),
        "product__name"
    );
});

test("element: Creates a CSS-class of the element with modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.element("product", "name", "is-selected is-focused size_xs"),
        "product__name product__name_is-selected product__name_is-focused product__name_size_xs"
    );
});

test("element: Creates a CSS-class of the element with modifiers and CSS-classes", function () {
    // Act & Assert.
    strictEqual(
        bem.element("product", "name", "is-selected is-focused size_xs", "clearfix"),
        "product__name product__name_is-selected product__name_is-focused product__name_size_xs clearfix"
    );
});

test("elementModifier: Creates a CSS-class of the element's modifier with multiple modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("product", "name", "is-selected is-focused size_xs"),
        "product__name_is-selected product__name_is-focused product__name_size_xs"
    );
});

test("elementModifier: Creates a CSS-class of the element's modifier with the modifier name and the modifier value", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("product", "name", "size", "xs"),
        "product__name_size_xs"
    );
});

test("elementModifier: Creates a CSS-class of the element's modifier with a list of modifiers", function () {
    // Act & Assert.
    strictEqual(
        bem.elementModifier("product", "name", [{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]),
        "product__name_is-selected product__name_is-focused product__name_size_xs"
    );
});

test("getBlock: Returns blocks by block name", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product'></div>\
        <div class='offer'></div>\
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
        <div class='offer'></div>\
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
        <div class='offer'></div>\
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
            <div class='offer'></div>\
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
            <div class='offer'></div>\
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
            <div class='offer'></div>\
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
            <div class='product__price'></div>\
        </div>\
        <div class='product'>\
            <div id='name2' class='product__name'></div>\
            <div class='product__price'></div>\
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
            <div class='product__price'></div>\
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
            <div class='product__price'></div>\
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
                <div class='product__price'></div>\
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
                <div class='product__price'></div>\
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

test("splitCssClasses: Ignores extra spaces", function () {
    // Arrange.
    var serializedCssClasses = "  h1     h2  h3 ";
    var expectedCssClasses = ["h1", "h2", "h3"]

    // Act.
    var actualCssClasses = bem.splitCssClasses(serializedCssClasses);

    // Assert.
    deepEqual(actualCssClasses, expectedCssClasses);
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

test("splitModifiers: Ignores extra spaces", function () {
    // Arrange.
    var serializedModifiers = " is-selected   size_xs     is-focused  ";
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

test("$.fn.addModifier: Adds a modifier, consisting of multiple modifiers, to a set of blocks", function () {
    // Arrange.
    var html = "\
        <div class='product'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").addModifier("is-selected is-focused size_xs");

    // Assert.
    ok($products.eq(0).attr("class") === "product product_is-selected product_is-focused product_size_xs");
    ok($products.eq(1).attr("class") === "product product_is-selected product_is-focused product_size_xs");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Adds a modifier, consisting of modifier with name and value, to a set of blocks", function () {
    // Arrange.
    var html = "\
        <div class='product'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").addModifier("size", "xs");

    // Assert.
    ok($products.eq(0).attr("class") === "product product_size_xs");
    ok($products.eq(1).attr("class") === "product product_size_xs");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Adds a modifier, consisting of a list of modifiers, to a set of blocks", function () {
    // Arrange.
    var html = "\
        <div class='product'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").addModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]);

    // Assert.
    ok($products.eq(0).attr("class") === "product product_is-selected product_is-focused product_size_xs");
    ok($products.eq(1).attr("class") === "product product_is-selected product_is-focused product_size_xs");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Adds a modifier, consisting of multiple modifiers, to a set of elements", function () {
    // Arrange.
    var html = "\
        <div class='product__name'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act.
    var $names = $(".product__name").addModifier("is-selected is-focused size_xs");

    // Assert.
    ok($names.eq(0).attr("class") === "product__name product__name_is-selected product__name_is-focused product__name_size_xs");
    ok($names.eq(1).attr("class") === "product__name product__name_is-selected product__name_is-focused product__name_size_xs");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Adds a modifier, consisting of modifier with name and value, to a set of elements", function () {
    // Arrange.
    var html = "\
        <div class='product__name'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act.
    var $names = $(".product__name").addModifier("size", "xs");

    // Assert.
    ok($names.eq(0).attr("class") === "product__name product__name_size_xs");
    ok($names.eq(1).attr("class") === "product__name product__name_size_xs");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Adds a modifier, consisting of a list of modifiers, to a set of elements", function () {
    // Arrange.
    var html = "\
        <div class='product__name'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act.
    var $names = $(".product__name").addModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]);

    // Assert.
    ok($names.eq(0).attr("class") === "product__name product__name_is-selected product__name_is-focused product__name_size_xs");
    ok($names.eq(1).attr("class") === "product__name product__name_is-selected product__name_is-focused product__name_size_xs");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Adds a modifier only to blocks and elements, ignoring other jQuery-objects", function () {
    // Arrange.
    var html = "\
        <div id='product1'></div>\
        <div class='product'></div>\
        <div class='product'>\
            <div class='product__name'></div>\
        </div>\
    ";
    $html.html(html);

    var $objects = $("#product1, .product, .product__name");

    // Act.
    $objects.addModifier("is-selected");

    // Assert.
    ok(!$objects.eq(0).attr("class"));
    ok($objects.eq(1).attr("class") === "product product_is-selected");
    ok($objects.eq(2).attr("class") === "product product_is-selected");
    ok($objects.eq(3).attr("class") === "product__name product__name_is-selected");

    // Clean.
    $html.empty();
});

test("$.fn.addModifier: Retains chaining", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div id='product2' class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").addModifier("is-selected");

    // Assert.
    ok(
        $products.length === 2 &&
        $products[0].id === "product1" &&
        $products[1].id === "product2"
    );

    // Clean.
    $html.empty();
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

test("$.fn.getBlock: Returns blocks by block name", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product'></div>\
            <div class='offer'></div>\
        </div>\
        <div class='products'>\
            <div id='product4' class='product'></div>\
        </div>\
        <div id='product5' class='product'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = $(".products").getBlock("product");

    // Assert.
    ok(
        $blocks.length === 3 &&
        $blocks[0].id === "product2" &&
        $blocks[1].id === "product3" &&
        $blocks[2].id === "product4"
    );

    // Clean.
    $html.empty();
});

test("$.fn.getBlock: Returns blocks by block name and modifier", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product product_is-selected'></div>\
            <div class='offer'></div>\
        </div>\
        <div class='products'>\
            <div id='product4' class='product product_is-selected'></div>\
        </div>\
        <div id='product5' class='product product_is-selected'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = $(".products").getBlock("product", "is-selected");

    // Assert.
    ok(
        $blocks.length === 2 &&
        $blocks[0].id === "product3" &&
        $blocks[1].id === "product4"
    );

    // Clean.
    $html.empty();
});

test("$.fn.getBlock: Returns blocks by block name, modifier name and modifier value", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product'></div>\
        <div class='products'>\
            <div id='product2' class='product'></div>\
            <div id='product3' class='product product_size_xs'></div>\
            <div id='product4' class='product product_size'></div>\
            <div class='offer'></div>\
        </div>\
        <div class='products'>\
            <div id='product5' class='product product_size_xs'></div>\
        </div>\
        <div id='product6' class='product product_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $blocks = $(".products").getBlock("product", "size", "xs");

    // Assert.
    ok(
        $blocks.length === 2 &&
        $blocks[0].id === "product3" &&
        $blocks[1].id === "product5"
    );

    // Clean.
    $html.empty();
});

test("$.fn.getElement: Returns elements by element name", function () {
    // Arrange.
    var html = "\
        <div id='name1' class='product__name'></div>\
        <div class='product'>\
            <div id='name2' class='product__name'></div>\
            <div class='product__price'></div>\
        </div>\
        <div class='product'>\
            <div id='name3' class='product__name'></div>\
        </div>\
        <div id='name4' class='product__name'></div>\
    ";
    $html.html(html);

    // Act.
    var $elements = $(".product").getElement("name");

    // Assert.
    ok(
        $elements.length === 2 &&
        $elements[0].id === "name2" &&
        $elements[1].id === "name3"
    );

    // Clean.
    $html.empty();
});

test("$.fn.getElement: Returns elements by element name and modifier", function () {
    // Arrange.
    var html = "\
        <div id='name1' class='product__name'></div>\
        <div class='product'>\
            <div id='name2' class='product__name'></div>\
        </div>\
        <div class='product'>\
            <div id='name3' class='product__name product__name_is-selected'></div>\
            <div class='product__price'></div>\
        </div>\
        <div class='product'>\
            <div id='name4' class='product__name product__name_is-selected'></div>\
        </div>\
        <div id='name5' class='product__name product__name_is-selected'></div>\
    ";
    $html.html(html);

    // Act.
    var $elements = $(".product").getElement("name", "is-selected");

    // Assert.
    ok(
        $elements.length === 2 &&
        $elements[0].id === "name3" &&
        $elements[1].id === "name4"
    );

    // Clean.
    $html.empty();
});

test("$.fn.getElement: Returns elements by element name, modifier name and modifier value", function () {
    // Arrange.
    var html = "\
        <div id='name1' class='product__name'></div>\
        <div class='product'>\
            <div id='name2' class='product__name'></div>\
        </div>\
        <div class='product'>\
            <div id='name3' class='product__name product__name_size_xs'></div>\
            <div class='product__price'></div>\
        </div>\
        <div class='product'>\
            <div id='name4' class='product__name product__name_size_xs'></div>\
            <div id='name5' class='product__name product__name_size'></div>\
        </div>\
        <div id='name6' class='product__name product__name_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $elements = $(".product").getElement("name", "size", "xs");

    // Assert.
    ok(
        $elements.length === 2 &&
        $elements[0].id === "name3" &&
        $elements[1].id === "name4"
    );

    // Clean.
    $html.empty();
});

test("$.fn.isBlock: Returns true if the jQuery-object is a block", function () {
    // Arrange.
    var html = "\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product").isBlock());

    // Clean.
    $html.empty();
});

test("$.fn.isBlock: Returns false if the jQuery-object is not a block", function () {
    // Arrange.
    var html = "\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product__name").isBlock());

    // Clean.
    $html.empty();
});

test("$.fn.isBlock: Returns false if the jQuery-object does not have a CSS-class", function () {
    // Arrange.
    var html = "\
        <div id='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$("#product").isBlock());

    // Clean.
    $html.empty();
});

test("$.fn.isElement: Returns true if the jQuery-object is an element", function () {
    // Arrange.
    var html = "\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product__name").isElement());

    // Clean.
    $html.empty();
});

test("$.fn.isElement: Returns false if the jQuery-object is not an element", function () {
    // Arrange.
    var html = "\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product").isElement());

    // Clean.
    $html.empty();
});

test("$.fn.isElement: Returns false if the jQuery-object does not have a CSS-class", function () {
    // Arrange.
    var html = "\
        <div id='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$("#product").isElement());

    // Clean.
    $html.empty();
});

test("$.fn.modifierValue: Returns the value of the modifier of the block", function () {
    // Arrange.
    var html = "\
        <div class='product product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product").modifierValue("size") === "xs");

    // Clean.
    $html.empty();
});

test("$.fn.modifierValue: Returns the value of the modifier of the element", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product__name").modifierValue("size") === "xs");

    // Clean.
    $html.empty();
});

test("$.fn.modifierValue: Returns an empty string if the block does not have the modifier", function () {
    // Arrange.
    var html = "\
        <div class='product'></div>\
        <div class='product product__name_size_xs'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product").modifierValue("size") === "");

    // Clean.
    $html.empty();
});

test("$.fn.modifierValue: Returns an empty string if the element does not have the modifier", function () {
    // Arrange.
    var html = "\
        <div class='product__name'></div>\
        <div class='product__name product__name_size_xs'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product__name").modifierValue("size") === "");

    // Clean.
    $html.empty();
});

test("$.fn.modifierValue: Sets the value of the modifier of blocks and retains chaining", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product product_size_xs'></div>\
        <div id='product2' class='product product_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").modifierValue("size", "m");

    // Assert.
    ok(
        $products.length === 2 &&
        $products[0].id === "product1" &&
        $products[1].id === "product2" &&
        $products.eq(0).attr("class") === "product product_size_m" &&
        $products.eq(1).attr("class") === "product product_size_m"
    );

    // Clean.
    $html.empty();
});

test("$.fn.modifierValue: Sets the value of the modifier of elements and retains chaining", function () {
    // Arrange.
    var html = "\
        <div id='name1' class='product_name product_name_size_xs'></div>\
        <div id='name2' class='product_name product_name_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product_name").modifierValue("size", "m");

    // Assert.
    ok(
        $products.length === 2 &&
        $products[0].id === "name1" &&
        $products[1].id === "name2" &&
        $products.eq(0).attr("class") === "product_name product_name_size_m" &&
        $products.eq(1).attr("class") === "product_name product_name_size_m"
    );

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns false if none of the set of blocks has the given modifier, consisting of multiple modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product").hasModifier("is-selected is-focused size_m"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns false if none of the set of blocks has the given modifier, consisting of modifier with name and value", function () {
    // Arrange.
    var html = "\
        <div class='product product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product").hasModifier("size", "m"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns false if none of the set of blocks has the given modifier, consisting of a list of modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product").hasModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "m" }]));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns false if none of the set of elements has the given modifier, consisting of multiple modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product__name").hasModifier("is-selected is-focused size_m"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns false if none of the set of elements has the given modifier, consisting of modifier with name and value", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product__name").hasModifier("size", "m"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns false if none of the set of elements has the given modifier, consisting of a list of modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok(!$(".product__name").hasModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "m" }]));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns true if any of the set of blocks has the given modifier, consisting of multiple modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    console.log($html);

    // Act & Assert.
    ok($(".product").hasModifier("is-selected is-focused size_xs"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns true if any of the set of blocks has the given modifier, consisting of modifier with name and value", function () {
    // Arrange.
    var html = "\
        <div class='product product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product").hasModifier("size", "xs"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns true if any of the set of blocks has the given modifier, consisting of a list of modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
        <div class='product'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product").hasModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns true if any of the set of elements has the given modifier, consisting of multiple modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product__name").hasModifier("is-selected is-focused size_xs"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns true if any of the set of elements has the given modifier, consisting of modifier with name and value", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product__name").hasModifier("size", "xs"));

    // Clean.
    $html.empty();
});

test("$.fn.hasModifier: Returns true if any of the set of elements has the given modifier, consisting of a list of modifiers", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
        <div class='product__name'></div>\
    ";
    $html.html(html);

    // Act & Assert.
    ok($(".product__name").hasModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]));

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Removes a modifier, consisting of multiple modifiers, from a set of blocks", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").removeModifier("is-selected is-focused size_xs");

    // Assert.
    ok($products.eq(0).attr("class") === "product");
    ok($products.eq(1).attr("class") === "product");

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Removes a modifier, consisting of modifier with name and value, from a set of blocks", function () {
    // Arrange.
    var html = "\
        <div class='product product_size_xs'></div>\
        <div class='product product_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").removeModifier("size", "xs");

    // Assert.
    ok($products.eq(0).attr("class") === "product");
    ok($products.eq(1).attr("class") === "product");

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Removes a modifier, consisting of a list of modifiers, from a set of blocks", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
        <div class='product product_is-selected product_is-focused product_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").removeModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]);

    // Assert.
    ok($products.eq(0).attr("class") === "product");
    ok($products.eq(1).attr("class") === "product");

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Removes a modifier, consisting of multiple modifiers, from a set of elements", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $names = $(".product__name").removeModifier("is-selected is-focused size_xs");

    // Assert.
    ok($names.eq(0).attr("class") === "product__name");
    ok($names.eq(1).attr("class") === "product__name");

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Removes a modifier, consisting of modifier with name and value, from a set of elements", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_size_xs'></div>\
        <div class='product__name product__name_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $names = $(".product__name").removeModifier("size", "xs");

    // Assert.
    ok($names.eq(0).attr("class") === "product__name");
    ok($names.eq(1).attr("class") === "product__name");

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Removes a modifier, consisting of a list of modifiers, from a set of elements", function () {
    // Arrange.
    var html = "\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
        <div class='product__name product__name_is-selected product__name_is-focused product__name_size_xs'></div>\
    ";
    $html.html(html);

    // Act.
    var $names = $(".product__name").removeModifier([{ name: "is-selected" }, { name: "is-focused" }, { name: "size", value: "xs" }]);

    // Assert.
    ok($names.eq(0).attr("class") === "product__name");
    ok($names.eq(1).attr("class") === "product__name");

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Retains chaining", function () {
    // Arrange.
    var html = "\
        <div id='product1' class='product product_is-selected'></div>\
        <div id='product2' class='product product_is-selected'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").removeModifier("is-selected");

    // Assert.
    ok(
        $products.length === 2 &&
        $products[0].id === "product1" &&
        $products[1].id === "product2"
    );

    // Clean.
    $html.empty();
});

test("$.fn.removeModifier: Retains other classes", function () {
    // Arrange.
    var html = "\
        <div class='product product_is-selected clearfix'></div>\
    ";
    $html.html(html);

    // Act.
    var $products = $(".product").removeModifier("is-selected");

    // Assert.
    ok(
        $products.length === 1 &&
        $products.eq(0).attr("class") === "product clearfix"
    );

    // Clean.
    $html.empty();
});