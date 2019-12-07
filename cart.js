const uuidv4 = require("uuid-v4");
const common = require("./common");

class ShoppingCart {
  constructor(cart) {
    this.products = cart.products || {};
    this.totalPrice = cart.totalPrice || 0;
    this.totalQuantity = cart.quantity || 0;
    this.salesTax = cart.salesTax || 0;
  }

  addProduct(input, quantity) {
    common.validateInput(input, quantity);
    const product = Object.assign({}, input);
    const id = uuidv4();
    product.collectivePrice = common.getCollectivePrice(
      product.price,
      quantity
    );
    product.quantity = quantity;
    this.totalPrice += product.collectivePrice;
    this.totalQuantity += quantity;
    this.products[id] = product;
    return product;
  }

  empty() {
    this.products = [];
    this.totalQuantity = 0;
    this.totalPrice = 0;
    this.salesTax = 0;
  }

  removeProduct(id) {
    this.totalQuantity = common.getDifference(
      this.totalQuantity,
      this.products[id].quantity
    );
    this.totalPrice = common.getDifference(
      this.getTotalPrice(),
      this.products[id].collectivePrice
    );
    delete this.products[id];
  }

  getProductById(id) {
    return this.products[id];
  }

  getTotalPrice() {
    let tp = common.numberFormatter(this.totalPrice);
    if (this.salesTax) {
      tp += this.getTax();
    }
    return tp;
  }

  deductTax() {
    this.totalPrice = this.getTotalPrice() - this.getTax();
    this.salesTax = 0;
  }

  getTax() {
    return common.calculateTax(this.totalPrice, this.salesTax);
  }

  getQuantity() {
    return this.totalQuantity;
  }

  setSalesTax(salesTax) {
    this.salesTax = salesTax;
  }

  getAllProducts() {
    return Object.assign(
      { allProducts: this.products },
      { total: this.getTotalPrice(), quantity: this.getQuantity() }
    );
  }
}

module.exports = {
  ShoppingCart
};
