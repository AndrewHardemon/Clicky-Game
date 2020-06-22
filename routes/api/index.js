const router = require("express").Router();
const scoreRoutes = require("./scores");

//Score Routes
router.use("/scores", scoreRoutes);

module.exports = router;