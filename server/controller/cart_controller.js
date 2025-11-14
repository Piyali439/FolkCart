// server/controller/cart_controller.js
const Order = require("../db/orderdb");

module.exports = {
    // 1. Save or Update Cart from Frontend
    async saveCart(req, res) {
        try {
            const { sessionId, cartItems, totalPrice } = req.body;

            // Find an existing "Active Cart" for this session
            let cart = await Order.findOne({ sessionId, status: 'Active Cart' });

            if (cart) {
                // Update existing cart
                cart.items = cartItems;
                cart.totalPrice = totalPrice;
            } else {
                // Create new cart
                cart = new Order({
                    sessionId,
                    items: cartItems,
                    totalPrice,
                });
            }

            await cart.save();
            res.json({ msg: "Cart updated successfully", cart });

        } catch (error) {
            console.error("Cart save error:", error);
            res.status(500).json({ msg: "Failed to update cart" });
        }
    },

    // 2. Get All Active Orders (for Admin Dashboard)
    async getActiveOrders(req, res) {
        try {
            // Fetch all carts that are 'Active Cart' or 'Pending' (if they moved past the initial save)
            const activeOrders = await Order.find({ status: { $in: ['Active Cart', 'Pending'] } }).sort({ createdAt: -1 });
            res.json(activeOrders);
        } catch (error) {
            console.error("Fetch orders error:", error);
            res.status(500).json({ msg: "Failed to fetch active orders" });
        }
    },
};