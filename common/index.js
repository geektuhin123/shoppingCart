// Common utility functions.

const numberFormatter = num => {
  return +(Math.round(num + "e+2") + "e-2");
};

const getCollectivePrice = (price, quantity) => {
  return numberFormatter(price * quantity);
};

const getDifference = (a, b) => {
  return numberFormatter(a - b);
};

const add = (a, b) => {
  return numberFormatter(a + b);
};

const calculateTax = (subtotal, stax) => {
  return numberFormatter(subtotal * (stax / 100));
};

const validateInput = (input, quantity) => {
  const price = input.price;

  switch (true) {
    case !price:
      throw new Error("Bad Request: price not provided.", {
        code: 400
      });
    case !quantity:
      throw new Error("Bad Request: quantity not provided.", {
        code: 400
      });
    case isNaN(price):
      throw new Error("Bad Request: Price is not a number.", { code: 400 });
    case isNaN(quantity):
      throw new Error("Bad Request: quantity is not a number.", { code: 400 });
    case !Number.isInteger(quantity):
      throw new Error("Bad Request: quantity is not a whole number.", {
        code: 400
      });
  }
};

module.exports = {
  add,
  calculateTax,
  getCollectivePrice,
  getDifference,
  numberFormatter,
  validateInput
};
