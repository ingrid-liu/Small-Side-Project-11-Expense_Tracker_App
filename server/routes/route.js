const routes = require("express").Router(); // require express framework
const controller = require("../controller/controller"); // require a file

routes
  .route("/api/categories")
  .post(controller.create_Categories)
  .get(controller.get_Categories);

routes
  .route("/api/transaction")
  .post(controller.create_Transaction)
  .get(controller.get_Transaction)
  .delete(controller.delete_Transaction);

module.exports = routes;
