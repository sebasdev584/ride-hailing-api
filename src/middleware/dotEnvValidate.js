const dotEnvValidate = (_, res, next) => {
  const variables = [];
  let error = false;
  const envVariables = [
    "PORT",
    "BASE_URL",
    "MONGOURI",
    "NODE_ENV",
    "PRIVATE_KEY",
    "URL_API",
    "PAYMENT_SOURCE_ID",
  ];

  try {
    envVariables.forEach((variable) => {
      if (!process.env[variable]) {
        error = true;
        variables.push(variable);
      }
    });
    if (error) {
      throw new Error(`Missing env variables ${variables.join(", ")}`);
    }
    next();
  } catch (error) {
    res.status(500).json({
      message: "Error",
      error: error.message,
    });
  }
};

module.exports = dotEnvValidate;
