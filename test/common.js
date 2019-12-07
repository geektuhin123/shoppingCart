const common = require("../common/index");
const assert = require("chai").assert;

describe("ShoppingCart", function() {
  describe("run tests for numberFormatter method", function() {
    const tests = [
      {
        value: 12.4534,
        expected: 12.45
      },
      {
        value: 12.4564,
        expected: 12.46
      },
      {
        value: 0.567,
        expected: 0.57
      },
      {
        value: 0.564,
        expected: 0.56
      },
      {
        value: 0.564000000000000078,
        expected: 0.56
      },
      {
        value: 34.995,
        expected: 35
      }
    ];

    for (let t of tests) {
      it(`format number : input > ${t.value} expected > ${t.expected}`, function() {
        assert.equal(common.numberFormatter(t.value), t.expected);
      });
    }
  });

  describe("run tests for getCollectivePrice method", function() {
    const tests = [
      {
        a: 2.12111,
        b: 2,
        expected: 4.24
      },
      {
        a: 9.12111,
        b: 9,
        expected: 82.09
      },
      {
        a: 23.12111,
        b: 2,
        expected: 46.24
      },
      {
        a: 445.12111,
        b: 20,
        expected: 8902.42
      }
    ];

    for (let t of tests) {
      it(`getCollectivePrice with : price = ${t.a} and quantity = ${t.b} > expected > ${t.expected}`, function() {
        assert.equal(common.getCollectivePrice(t.a, t.b), t.expected);
      });
    }
  });

  describe("run tests for getDifference method", function() {
    const tests = [
      {
        a: 2.12111,
        b: 2,
        expected: 0.12
      },
      {
        a: 4.12111,
        b: 2,
        expected: 2.12
      },
      {
        a: 4.98911,
        b: 2.3,
        expected: 2.69
      }
    ];

    for (let t of tests) {
      it(`getDifference with : price = ${t.a} and quantity = ${t.b} > expected > ${t.expected}`, function() {
        assert.equal(common.getDifference(t.a, t.b), t.expected);
      });
    }
  });
});
