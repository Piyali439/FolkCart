// server/controller/dashboard_controller.js (NEW FILE)
//const User = require("../db/userdb");   // Assuming you have a User model
const Order = require("../db/orderdb"); // The Order model we created

module.exports = {
    async getDashboardStats(req, res) {
        try {
            // 1. Calculate Total Users (Assuming all documents in your User model are users)
            //const totalUsers = await User.countDocuments({}); 
            const totalUsers = 'N/A';
            // 2. Calculate Total Sales (Sum of totalPrice from completed orders)
            // Assuming 'Delivered' or 'Shipped' status marks a completed sale
            const totalSalesData = await Order.aggregate([
                { $match: { status: { $in: ['Shipped', 'Delivered'] } } }, // Only count completed sales
                { $group: { _id: null, totalRevenue: { $sum: "$totalPrice" } } }
            ]);
            
            const totalSales = totalSalesData.length > 0 ? totalSalesData[0].totalRevenue : 0;

            // 3. Active Carts (Already implemented, but fetched here)
            const activeCarts = await Order.countDocuments({ status: 'Active Cart' });

            res.json({
                totalUsers: totalUsers,
                totalSales: totalSales,
                activeCarts: activeCarts,
            });

        } catch (error) {
            console.error("Dashboard Stats Error:", error);
            res.status(500).json({ msg: "Failed to fetch dashboard statistics" });
        }
    },
};