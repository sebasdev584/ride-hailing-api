const test = require("node:test");
const assert = require("node:assert");
const { calculateAmountToPaid } = require("../../lib/helpers");
require("dotenv").config();
const baseUrl = process.env.BASE_URL;
let idRace = null;
let riders = null;

test("must assign race to rider given", async () => {
  await fetch(`${baseUrl}/api/seed`);
  const allRiders = await fetch(`${baseUrl}/api/get-all-riders`);
  riders = await allRiders.json();
  riders = riders.data[0];

  const requestRide = await fetchData(`request-ride/${riders._id}`, {
    latitud: Number(riders.latitud.$numberDecimal),
    longitud: Number(riders.longitud.$numberDecimal),
    direction: "calle stder #2",
    email: "test@mail.com",
  });

  const response = await requestRide.json();
  idRace = response?.data?.id_race;

  assert.equal(response.message, "Carrera asignada");
  assert.ok(response.data.id_race);
});

test("must finish ride by id given", async () => {
  const requestRide = await fetchData(`finish-ride/${idRace}`, {
    km_traveled: 50,
    payment_type: "credit_card",
    time: 30,
  });
  const response = await requestRide.json();

  const amount = calculateAmountToPaid(50, 30);

  assert.equal("Carrera finalizada correctamente", response.message);
  assert.equal(idRace, response.data.id_race);
  assert.equal(amount, response.data.amount);
});

test("must return a error when rider not exist", async () => {
  const requestRide = await fetchData("request-ride/65c8522450bd56fe9625eeb9", {
    latitud: Number(riders.latitud.$numberDecimal),
    longitud: Number(riders.longitud.$numberDecimal),
    direction: "calle stder #2",
    email: "test@mail.com",
  });

  const response = await requestRide.json();

  assert.equal("Error", response.message);
  assert.equal("rider not found", response.error);
});

test("must return a error when there is data null", async () => {
  const requestRide = await fetchData(`finish-ride/${idRace}`, {
    km_traveled: null,
    payment_type: "credit_card",
    time: 30,
  });
  const response = await requestRide.json();

  assert.equal("Error en validaciones", response.message);
  assert.equal("km debe ser numérico", response.error[0]);
});

const fetchData = async (partialUrl, payload) => {
  return await fetch(`${baseUrl}/api/${partialUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
};
