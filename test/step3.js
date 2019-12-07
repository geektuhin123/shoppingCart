const { ShoppingCart } = require("../cart");
const common = require("../common/index");
const assert = require("chai").assert;

describe("ShoppingCart", function() {
  let productDove, productAxe, salesTax;
  before(function() {
    carts = new ShoppingCart({});
    productDove = { name: "Dove Soap", price: 39.99 };
    productAxe = { name: "Axe Deo", price: 99.99 };
    salesTax = 12.5;
  });

  describe("Step 3: Calculate the tax rate of the shopping cart with multiple items.", function() {
    it("The user adds 2 Dove Soaps to the shopping cart", function() {
      const added = carts.addProduct(productDove, 2);
      assert.equal(carts.getQuantity(), 2);
      assert.equal(added.name, "Dove Soap");
      assert.equal(added.price, 39.99, "Per item price is not 39.99");
    });
    it("And then adds 2 Axe Deos to the shopping cart", function() {
      const added = carts.addProduct(productAxe, 2);
      assert.equal(added.price, 99.99, "Per item price is not 99.9");
      assert.equal(added.name, "Axe Deo");
      assert.equal(carts.getQuantity(), 4);
    });
    it("The shopping cart should contain 4 products 2 Dove Soaps and 2 Axe deos each with a unit price of 39.99 and 99.9, And the shopping cart’s total price should equal 314.96", function() {
      carts.setSalesTax(salesTax);
      const allProducts = carts.getAllProducts();
      assert.equal(carts.getTax(), 35);
      assert.equal(allProducts.total, 314.96);
      assert.equal(allProducts.quantity, 4);
    });
  });

  describe("cleanup", function() {
    it("remove all items from the cart", function() {
      carts.deductTax();
      for (let item of Object.keys(carts.getAllProducts().allProducts)) {
        carts.removeProduct(item);
      }
      assert.equal(carts.getQuantity(), 0);
      assert.equal(carts.getTotalPrice(), 0);
    });
  });
});
