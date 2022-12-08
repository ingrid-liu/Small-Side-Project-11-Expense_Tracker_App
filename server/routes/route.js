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

routes
  .route("/api/users")
  .post(controller.get_User)
  .put(controller.create_User);

routes.route("/api/labels").get(controller.get_Labels);

module.exports = routes;
