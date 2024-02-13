const { app } = require("./app");
const router = require("./src/router/index");

app.listen(process.env.PORT);

app.use("/api", router);
