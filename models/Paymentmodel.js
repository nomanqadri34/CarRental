import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema({
 productname:String,
 
  orderId: String,
  paymentId: String,
  signature: String,
  amount: Number,
  currency: String,
  status: String,
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);

export default Payment;
