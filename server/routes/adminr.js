const exp = require("express");
const router = exp.Router();
const admin = require("../controller/admin_controller");
const dashboard = require("../controller/dashboard_controller"); // <-- NEW IMPORT
const auth = require("../middleware/auth");

router.post("/register", admin.registerAdmin);
router.post("/login", admin.login);
router.get("/stats", auth, dashboard.getDashboardStats);

module.exports = router;
