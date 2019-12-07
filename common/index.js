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

module.exports = {
  add,
  numberFormatter,
  getDifference,
  calculateTax,
  getCollectivePrice
};
