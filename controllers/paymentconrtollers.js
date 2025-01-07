import Razorpay from 'razorpay';
import Payment from '../models/Paymentmodel.js';
//import Order from '../models/orderModel.js';
import dotenv from 'dotenv';
import crypto from 'crypto';

dotenv.config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

export const createOrder = async (req, res) => {
  try {
    const { amount, currency } = req.body;
    const options = {
      amount: amount * 1, // amount in the smallest currency unit
      currency: currency,
      receipt: `receipt_order_${Math.floor(Math.random() * 10000)}`,
    };
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const verifyPayment = async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, cart } = req.body;

  const generated_signature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest('hex');

  if (generated_signature === razorpay_signature) {
    const payment = new Payment({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
      signature: razorpay_signature,
      amount: req.body.amount,
      currency: req.body.currency,
      status: 'success',
    });

    try {
      await payment.save();

      // After successful payment, create an order in the database
      const order = new Order({
        products: cart,
        payment: {
          razorpay_order_id,
          razorpay_payment_id,
        },
        buyer: req.user._id,
        amount: req.body.amount,
        currency: req.body.currency,
        status: 'Processing', // You can define the initial status of the order
      });

      await order.save();

      res.json({ status: 'success', message: 'Payment verified and order placed successfully' });
    } catch (error) {
      res.status(500).send(error);
    }
  } else {
    res.status(400).json({ status: 'failure', message: 'Payment verification failed' });
  }
};
