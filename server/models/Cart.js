const mongoose = require('mongoose');
// Creating Cart schema

const CartSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, default: 1, min: 1, required: true }
            }
        ]
    },
    { timestamps: true } // createdAt and UpdatedAt time noted
);

module.exports = mongoose.model("Cart", CartSchema);