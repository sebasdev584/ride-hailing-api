const z = require("zod");

const raceSchema = z.object({
  payment_type: z.enum(["credit_card", "cash"]),
  km_traveled: z
    .number({
      required_error: "Los kilómetros recorridos deben ser diligenciados",
      invalid_type_error: "km debe ser numérico",
    })
    .positive({
      message: "Los kilometros recorridos deben ser mayor que 0",
    }),
  time: z
    .number({
      required_error: "El tiempo del recorrido debe ser diligenciado",
      invalid_type_error: "Tiempo debe ser numérico",
    })
    .int("Tiempo debe ser número entero")
    .positive({
      message: "Tiempo debe ser mayor que cero",
    }),
});

module.exports = raceSchema;
