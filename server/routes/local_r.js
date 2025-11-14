const exp = require("express");
const router = exp.Router();
const lc = require("../controller/local_controller");

// Routes for Attractions
router.post("/add-attraction", lc.addAttraction);
router.get("/get-attractions", lc.getAttractions);

// Routes for Local Statistics
router.post("/update-stats", lc.updateStats);
router.get("/get-stats", lc.getStats);

module.exports = router;
