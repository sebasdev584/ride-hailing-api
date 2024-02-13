const { connect, disconnect } = require("../../db/client");
const HttpError = require("../exceptions/HttpError");
const RiderModel = require("../models/rider.model");

const { updateDriverService, getFreeDriver } = require("./driver.service");
const { saveRaceService } = require("./race.service");

const createRideService = async (id, body) => {
  try {
    await connect();
    const rider = await RiderModel.findByIdAndUpdate(id, {
      ...body,
      email_rider: body.email,
    });

    if (!rider) {
      throw new HttpError("rider not found", 404);
    }

    const driverId = await getFreeDriver();

    if (!driverId) {
      throw new HttpError("no free drivers", 400);
    }

    await updateDriverService(driverId, {
      assigned_rider: true,
      status: "in-ride",
    });

    const race = await saveRaceService({
      id_driver: driverId,
      id_rider: rider._id,
      status: "in-process",
    });

    return {
      status: true,
      data: {
        id_race: race._id,
        direction: body.direction,
      },
    };
  } catch (error) {
    await disconnect();
    throw new HttpError(error.message, error.statusCode);
  } finally {
    await disconnect();
  }
};

const getAllRidersService = async () => {
  try {
    await connect();
    return await RiderModel.find().lean();
  } catch (error) {
    await disconnect();
    throw new HttpError(`Error getting riders: ${error.message}`, 404);
  } finally {
    await disconnect();
  }
};

const getOneRider = async (id) => {
  try {
    await connect();
    return await RiderModel.findById(id).lean();
  } catch (error) {
    await disconnect();
    throw new Error(`Error getting rider : ${error.message}`, 404);
  } finally {
    await disconnect();
  }
};

module.exports = {
  createRideService,
  getAllRidersService,
  getOneRider,
};
