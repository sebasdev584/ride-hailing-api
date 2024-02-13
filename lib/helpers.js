const { randomUUID } = require("node:crypto");

const BASE_FEE_KM = 1000;
const BASE_FEE_MINUTES = 200;
const HEADERS_API = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${process.env.PRIVATE_KEY}`,
};

const calculateAmountToPaid = (km, time) => {
  const baseFee = 3500;
  const totalByMinutes = calculateAmountByMinutes(time);
  const totalByKm = calculateAmountByKm(km);

  return Math.round(baseFee + totalByMinutes + totalByKm);
};

const calculateAmountByMinutes = (minutes) =>
  Number(minutes) * BASE_FEE_MINUTES;

const calculateAmountByKm = (km) => Number(km) * BASE_FEE_KM;

const fetchDataPOST = async (url, payload) => {
  try {
    return await fetch(url, {
      method: "POST",
      headers: HEADERS_API,
      body: JSON.stringify(payload),
    });
  } catch (error) {
    throw new Error(
      `Error al intentar consumir el api ${url}, error: ${error.message}`
    );
  }
};

const getReferenceForPay = () => randomUUID();

module.exports = {
  calculateAmountToPaid,
  fetchDataPOST,
  getReferenceForPay,
};
