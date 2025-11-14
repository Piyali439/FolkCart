// server/routes/cart_r.js
const exp = require("express");
const router = exp.Router();
const cc = require("../controller/cart_controller");

// Endpoint for customer frontend to save/update their cart
router.post("/save", cc.saveCart);

// Endpoint for Admin Dashboard to fetch active carts/orders (Protected)
const auth = require("../middleware/auth"); // Assuming this is your admin auth middleware
router.get("/active", auth, cc.getActiveOrders);

module.exports = router;