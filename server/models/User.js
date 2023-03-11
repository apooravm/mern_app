const mongoose = require('mongoose');
// Creating User schema

const UserSchema = new mongoose.Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        phone: { type: Number },
        address: {
            street: { type: String },
            city: { type: String },
            state: { type: String },
            country: { type: String }
          },        
        orders: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
        ],
        cart: [
            { type: mongoose.Schema.ObjectId, ref: 'Order'}
        ],
        isAdmin: { type: Boolean, default: true}
    },
    { timestamps: true } // createdAt and UpdatedAt time noted
);

module.exports = mongoose.model("User", UserSchema);