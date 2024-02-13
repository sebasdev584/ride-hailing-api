const { finishRideService } = require("../services/driver.service");

const finishRide = async (req, res) => {
  try {
    const { id } = req.params;
    const finishRace = await finishRideService(id, req.body);

    res.status(200).json({
      message: "Carrera finalizada correctamente",
      data: finishRace.data,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = { finishRide };
