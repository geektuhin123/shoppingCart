const { ShoppingCart } = require("../cart");
const assert = require("chai").assert;

describe("ShoppingCart", function() {
  let product;
  before(function() {
    carts = new ShoppingCart({});
    product = { name: "Dove Soap", price: 39.99 };
  });

  describe("Step 1: Add products to the shopping cart.", function() {
    it("Dove Soap with a unit price of 39.99", function() {
      carts.addProduct(product, 5);
      assert.equal(carts.getQuantity(), 5);
    });
    it("get Product", function() {
      const a = carts.getAllProducts();
      assert.equal(a.total, 199.95);
      assert.equal(a.quantity, 5);
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
