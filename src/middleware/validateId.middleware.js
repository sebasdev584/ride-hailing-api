const ObjectId = require("mongoose").Types.ObjectId;

const isValidId = (req, res, next) => {
  const { id = "" } = req.params;
  try {
    if (!ObjectId.isValid(id)) {
      throw new Error("El id proporcionado no es válido");
    }

    next();
  } catch (error) {
    res.status(400).json({
      message: "Error de validaciones",
      error: error.message,
    });
  }
};

module.exports = isValidId;
