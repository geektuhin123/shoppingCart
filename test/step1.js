const { ShoppingCart } = require("../cart");
const assert = require("chai").assert;

describe("ShoppingCart - Step 1", function() {
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

describe("Add product and calculate total", function() {
  before(function() {
    carts = new ShoppingCart({});
  });

  describe("Add products to the shopping cart.", function() {
    const tests = [
      {
        product: { name: "Dove Soap", price: 39.99 },
        quantity: 4,
        expected: {
          total: 159.96
        }
      },
      {
        product: { name: "Axe Soap", price: 47 },
        quantity: 2,
        expected: {
          total: 94
        }
      },
      {
        product: { name: "Face wash", price: 90 },
        quantity: 3,
        expected: {
          total: 270
        }
      }
    ];
    for (let test of tests) {
      it(`${test.quantity} ${test.product.name} added with price ${test.product.price} expected total : ${test.expected.total}`, function() {
        carts.addProduct(test.product, test.quantity);
        assert.equal(carts.getQuantity(), test.quantity);
        assert.equal(carts.getTotalPrice(), test.expected.total);
      });
      it("remove all items from the cart", function() {
        for (let item of Object.keys(carts.getAllProducts().allProducts)) {
          carts.removeProduct(item);
        }
        assert.equal(carts.getQuantity(), 0);
        assert.equal(carts.getTotalPrice(), 0);
      });
    }
  });
});
