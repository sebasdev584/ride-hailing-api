const z = require("zod");

const riderSchema = z.object({
  latitud: z.number({
    required_error: "Error, la latitud es obligatoria",
    invalid_type_error: "Error, la latitud debe ser numerico",
  }),
  longitud: z.number({
    required_error: "Error, la longitud es obligatoria",
    invalid_type_error: "Error, la longitud debe ser numérico",
  }),
  direction: z.string({
    required_error: "Error, la dirección es obligatoria",
    invalid_type_error: "Error, la dirección debe ser string",
  }),
  email: z
    .string({
      required_error: "Error, el email es obligatorio",
      invalid_type_error: "Error, el email debe ser un string",
    })
    .email("Email inválido"),
});

module.exports = riderSchema;
