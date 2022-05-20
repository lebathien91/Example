const siteRouter = require("./site");
const diseasesRouter = require("./diseases");
const usersRouter = require("./users");

const routes = (app) => {
  app.use("/users", usersRouter);

  app.use("/diseases", diseasesRouter);

  app.use("/", siteRouter);
};

module.exports = routes;
