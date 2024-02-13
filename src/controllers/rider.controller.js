const { paymentService } = require("../services/payment.service");
const {
  createRideService,
  getAllRidersService,
} = require("../services/rider.service");

const requestRide = async (req, res) => {
  try {
    const { id } = req.params;
    const riderCreated = await createRideService(id, req.body);

    res.status(201).json({
      message: "Carrera asignada",
      data: riderCreated.data,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: "Error",
      error: error.message,
    });
  }
};

const payment = async (req, res) => {
  try {
    const { id } = req.params;

    const savePayment = await paymentService(id);

    res.status(200).json({
      message: "Pago realizado correctamente",
      data: {
        savePayment,
      },
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: "Error",
      error: error.message,
    });
  }
};

const getAllRiders = async (_, res) => {
  try {
    const allRiders = await getAllRidersService();
    res.json({
      message: "Datos encontrados",
      data: allRiders,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = {
  requestRide,
  payment,
  getAllRiders,
};
