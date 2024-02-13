const { connect, disconnect } = require("../../db/client");
const driverModel = require("../models/driver.model");
const riderModel = require("../models/rider.model");
const { drivers, riders } = require("../../lib/constanst");

const seeder = async (_, res) => {
  if (process.env.NODE_ENV !== "development") {
    return res.status(401).json({
      message: "Only in develop mode ",
    });
  }

  await connect();

  await createDrivers();
  await createRiders();

  await disconnect();
  res.status(200).send("Ok");
};

const createDrivers = async () => {
  await driverModel.deleteMany();
  await driverModel.insertMany(drivers);
};

const createRiders = async () => {
  await riderModel.deleteMany();
  await riderModel.insertMany(riders);
};

module.exports = seeder;
