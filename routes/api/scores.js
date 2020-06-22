const router = require("express").Router();
const scoreController = require("../../controllers/scoreController");

//For making a username
router.route("/")
  .get(scoreController.findAll)
  // .get(scoreController.findHighest)
  .post(scoreController.create)

//For getting the score for the user
router.route("/:id")
  .get(scoreController.findByName)
  .put(scoreController.update)
  .delete(scoreController.remove)

module.exports = router;