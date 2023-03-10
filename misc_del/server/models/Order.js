const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    products: [
      {
        productId: { type: String, required: true },
        quantity: { type: Number, default: 1, required: true },
        price: { type: Number, required: true }
      },
    ],
    total_amount: { type: Number, required: true },
    delivery_address: { type: String, required: true },
    payment_method: { type: String, required: true },
    
    
    status: { type: String, default: "pending", enum: ['pending', 'processing', 'shipped', 'delivered']},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Order", OrderSchema);

/*
// Assume that you have retrieved the Product documents corresponding to the ordered products and stored them in an array called orderedProducts.

const Order = require('./models/order');

// Create a new order document.
const newOrder = new Order({
  user: userId, // Replace userId with the ID of the user who placed the order.
  items: orderedProducts.map(product => ({
    product: product._id,
    quantity: product.quantity,
    price: product.price
  })),
  totalAmount: calculateTotalAmount(orderedProducts), // Replace calculateTotalAmount with a function that calculates the total amount of the order.
  paymentMethod: 'COD', // Replace with the payment method used by the user.
  status: 'Pending' // Set the initial status of the order.
});

// Save the order document to the database.
newOrder.save((err, savedOrder) => {
  if (err) {
    console.log('Error saving order:', err);
    return;
  }

  console.log('Order saved successfully:', savedOrder);
});

*/