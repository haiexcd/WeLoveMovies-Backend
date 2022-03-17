const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../utils/errors/methodNotAllowed");

router
  .route("/:reviewId")
  .get(controller.read)
  .put(controller.put)
  .delete(controller.delete)
  .all(methodNotAllowed);

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;