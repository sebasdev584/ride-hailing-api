const mongoose = require("mongoose");
const connection = {
  isConnected: false,
};

const connect = async () => {
  try {
    if (connection.isConnected === 1) {
      return;
    }
    //reutilizar conexión existente
    if (mongoose.connections.length > 0) {
      connection.isConnected = mongoose.connections[0].readyState;

      if (connection.isConnected === 1) {
        return;
      }
      await mongoose.disconnect();
    }

    await mongoose.connect(process.env.MONGOURI);
    connection.isConnected = true;
  } catch (error) {
    console.error("Error consultando la bd", error.message);
    connection.isConnected = false;
  }
};

const disconnect = async () => {
  if (process.env.NODE_ENV === "development") {
    return;
  }
  if (connection.isConnected === 0) {
    return;
  }

  await mongoose.disconnect();
};

module.exports = { connect, disconnect };
