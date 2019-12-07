const { ShoppingCart } = require("../cart");
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

describe("Add product and calculate total", function() {
  before(function() {
    carts = new ShoppingCart({});
  });

  describe("Add products to the shopping cart.", function() {
    const tests = [
      {
        products: [
          { name: "Dove Soap", price: 40, quantity: 3 },
          { name: "Fog Deo", price: 23, quantity: 6 }
        ],
        salesTax: 10,
        expected: {
          total: 283.8,
          tax: 25.8,
          quantity: 9
        }
      },
      {
        products: [
          { name: "Pencil", price: 40, quantity: 3 },
          { name: "Watch", price: 1999.989, quantity: 1 }
        ],
        salesTax: 10,
        expected: {
          total: 2331.99,
          tax: 212,
          quantity: 4
        }
      }
    ];
    for (let test of tests) {
      const products = test.products;
      for (let p of products) {
        it(`${p.quantity} ${p.name} added with price ${p.price}`, function() {
          carts.addProduct(p, p.quantity);
        });
      }
      it(`The shopping carts expected total price: ${test.expected.total}`, function() {
        carts.setSalesTax(test.salesTax);
        const allProducts = carts.getAllProducts();
        assert.equal(carts.getTax(), test.expected.tax);
        assert.equal(allProducts.total, test.expected.total);
        assert.equal(allProducts.quantity, test.expected.quantity);
      });
      it("remove all items from the cart", function() {
        carts.deductTax();
        for (let item of Object.keys(carts.getAllProducts().allProducts)) {
          carts.removeProduct(item);
        }
        assert.equal(carts.getQuantity(), 0);
        assert.equal(carts.getTotalPrice(), 0);
      });
    }
  });
});

describe("ShoppingCart - Negative test cases", function() {
  before(function() {
    carts = new ShoppingCart({});
    salesTax = 12.5;
  });

  describe("Calculate the tax rate of the shopping cart with multiple items.", function() {
    const productDove = { name: "Dove Soap", price: "asd" };
    const productAxe = { name: "Axe Deo" };
    const productFog = { name: "Fog Deo", price: "330iasd" };
    const goodProduct = { name: "Fog Deo", price: 12 };
    it("User fails to add 2 Dove Soaps to the shopping cart since price is not a number.", function() {
      try {
        carts.addProduct(productDove, 2);
        assert.isTrue(false);
      } catch (e) {
        assert.equal(e.message, "Bad Request: Price is not a number.");
      }
    });
    it("User fails to add 2 Fog Deo to the shopping cart since price is not a number.", function() {
      try {
        carts.addProduct(productFog, 2);
        assert.isTrue(false);
      } catch (e) {
        assert.equal(e.message, "Bad Request: Price is not a number.");
      }
    });
    it("User fails to add 2 Axe Deo to the shopping cart since price is not provided.", function() {
      try {
        carts.addProduct(productAxe, 2);
        assert.isTrue(false);
      } catch (e) {
        assert.equal(e.message, "Bad Request: price not provided.");
      }
    });
    it("User fails to add 2 Fog Deo to the shopping cart since quantity is not a whole number.", function() {
      try {
        carts.addProduct(goodProduct, 2.5);
        assert.isTrue(false);
      } catch (e) {
        assert.equal(e.message, "Bad Request: quantity is not a whole number.");
      }
    });
  });
});
