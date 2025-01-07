
import express from 'express';
import { createOrder, verifyPayment } from '../controllers/paymentconrtollers.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-payment', verifyPayment);

export default router;
