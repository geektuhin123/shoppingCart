const { ShoppingCart } = require("../cart");
const assert = require("chai").assert;

describe("ShoppingCart", function() {
  let product;
  before(function() {
    carts = new ShoppingCart({});
    product = { name: "Dove Soap", price: 39.99 };
  });

  describe("Step 2: Add additional products of the same type to the shopping cart.", function() {
    it("The user adds 5 Dove Soaps to the shopping cart", function() {
      carts.addProduct(product, 5);
      assert.equal(carts.getQuantity(), 5);
    });
    it("And then adds another 3 Dove Soaps to the shopping cart", function() {
      const added = carts.addProduct(product, 3);
      assert.equal(added.price, 39.99);
      assert.equal(added.name, "Dove Soap");
    });
    it("The shopping cart should contain 8 Dove Soaps each with a unit price of 39.99", function() {
      const allProducts = carts.getAllProducts();
      assert.equal(allProducts.quantity, 8);
    });
    it("And the shopping cart’s total price should equal 319.92", function() {
      const allProducts = carts.getAllProducts();
      assert.equal(allProducts.total, 319.92);
      assert.equal(allProducts.quantity, 8);
    });
  });

  describe("cleanup", function() {
    it("remove all items from the cart", function() {
      for (let item of Object.keys(carts.getAllProducts().allProducts)) {
        carts.removeProduct(item);
      }
      assert.equal(carts.getQuantity(), 0);
      assert.equal(carts.getTotalPrice(), 0);
    });
  });
});
