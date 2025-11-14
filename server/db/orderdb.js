// server/db/orderdb.js
const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    // Optional: Reference to a customer user ID if you implement user login later
    // customerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }, 
    
    // Status to differentiate active cart from confirmed order
    status: { 
        type: String, 
        enum: ['Active Cart', 'Pending', 'Shipped', 'Delivered'], 
        default: 'Active Cart' 
    },
    
    // Items in the cart
    items: [
        {
            //productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            productId: { type: String, required: true },
            name: String,
            price: Number,
            quantity: Number,
        }
    ],
    
    totalPrice: Number,
    // Session ID is critical for tracking anonymous carts
    sessionId: { type: String, required: true, unique: true }, 
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", OrderSchema);