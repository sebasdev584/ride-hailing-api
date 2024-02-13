const test = require("node:test");
const assert = require("node:assert");
const { getAllRidersService } = require("../../src/services/rider.service");
require("dotenv").config();

test("can get all riders", async () => {
  const result = await getAllRidersService();

  assert.ok(result);
});
