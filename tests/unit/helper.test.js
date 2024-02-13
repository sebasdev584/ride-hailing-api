const test = require("node:test");
const assert = require("node:assert");
const { calculateAmountToPaid } = require("../../lib/helpers");

test("must return amount value", () => {
  const amount = calculateAmountToPaid(50, 30);
  assert.equal(amount, 59500);
});
