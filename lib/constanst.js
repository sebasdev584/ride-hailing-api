const drivers = [
  {
    assigned_rider: false,
    status: "free",
  },
  {
    assigned_rider: false,
    status: "free",
  },
  {
    assigned_rider: false,
    status: "free",
  },
  {
    assigned_rider: false,
    status: "free",
  },
];

const riders = [
  {
    latitud: 42.27925,
    longitud: -62.73018,
    status: "in-ride",
  },
  {
    latitud: 22.27925,
    longitud: -12.73018,
    status: "none",
  },
  {
    latitud: 72.27925,
    longitud: 61.73018,
    status: "in-ride",
  },
  {
    latitud: 18.27925,
    longitud: -62.73018,
    status: "in-ride",
  },
];

module.exports = { drivers, riders };
