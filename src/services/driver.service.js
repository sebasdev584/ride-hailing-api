const DriverModel = require("../models/driver.model");
const { connect, disconnect } = require("../../db/client");
const { updateRaceService } = require("./race.service");
const { calculateAmountToPaid } = require("../../lib/helpers");
const HttpError = require("../exceptions/HttpError");

const updateDriverService = async (id, payload) => {
  try {
    await DriverModel.findByIdAndUpdate(id, payload, { new: true });
  } catch (error) {
    throw new HttpError(`Error ${error.message}`, 400);
  }
};

const finishRideService = async (id, body) => {
  try {
    await connect();
    const { km_traveled, payment_type, time } = body;
    //calcular valor a pagar
    const amount = calculateAmountToPaid(km_traveled, time);
    //Buscar carrera y finalizar
    const race = await updateRaceService(id, {
      status: "pending-payment",
      amount,
      payment_type,
    });

    if (!race) {
      throw new HttpError("race not found or ended", 404);
    }

    //Buscar conductor de carrera y actualizar estado a free
    await DriverModel.findByIdAndUpdate(race.id_driver, { status: "free" });

    return {
      data: {
        id_race: race._id,
        amount,
      },
    };
  } catch (error) {
    await disconnect();
    throw new HttpError(`Error ${error.message}`, error.statusCode);
  } finally {
    await disconnect();
  }
};

const getFreeDriver = async () => {
  const drivers = await DriverModel.find({
    status: "free",
  });

  return drivers[0]?._id ?? null;
};

module.exports = {
  updateDriverService,
  finishRideService,
  getFreeDriver,
};
