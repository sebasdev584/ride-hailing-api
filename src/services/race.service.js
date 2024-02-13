const HttpError = require("../exceptions/HttpError");
const RaceModel = require("../models/races.model");

const getRaceService = async (id) => {
  try {
    const race = await RaceModel.findOne({
      _id: id,
      status: "pending-payment",
    });
    if (!race) {
      throw new HttpError("Race not found", 404);
    }

    return race;
  } catch (error) {
    throw new HttpError(error.message, error.statusCode);
  }
};

const saveRaceService = async (payload) => {
  try {
    const race = new RaceModel(payload);
    await race.save();

    return race;
  } catch (error) {
    throw new HttpError(`Error saving race ${error.message}`, 400);
  }
};

const updateRaceService = async (id, payload, status = "in-process") => {
  try {
    return await RaceModel.findOneAndUpdate({ status, _id: id }, payload, {
      new: true,
    });
  } catch (error) {
    throw new HttpError(`Error updating race: ${error.message}`, 400);
  }
};

module.exports = {
  saveRaceService,
  updateRaceService,
  getRaceService,
};
