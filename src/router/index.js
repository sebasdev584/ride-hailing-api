const { Router } = require("../../app");

const {
  requestRide,
  payment,
  getAllRiders,
} = require("../controllers/rider.controller");
const { finishRide } = require("../controllers/driver.controller");
const seederController = require("../controllers/seeder.controller");
const isValidId = require("../middleware/validateId.middleware");
const validateSchema = require("../middleware/validate.middleware");
const raceSchema = require("../schema/races.schema");
const riderSchema = require("../schema/rider.schema");

Router.post(
  "/request-ride/:id",
  isValidId,
  validateSchema(riderSchema),
  requestRide
);

Router.post(
  "/finish-ride/:id",
  isValidId,
  validateSchema(raceSchema),
  finishRide
);

Router.get("/payment/:id", payment);

//seeder
Router.get("/seed", seederController);

Router.get("/get-all-riders", getAllRiders);

//404
Router.get("/*", (_, res) => {
  res.status(404).json({
    message: "Ruta no encontrada",
    data: [],
  });
});

module.exports = Router;
