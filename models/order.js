// D:\three60onwords\models\orderModel.js

import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    razorpay_order_id: String,
    amount: Number,
    currency: String,
    receipt: String,
    notes: String,
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
