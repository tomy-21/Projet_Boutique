import express from 'express';
import {
  placeOrder,
  getUserOrders
} from '../controllers/order.controller.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.use(protect);
router.post('/checkout', placeOrder);
router.get('/', getUserOrders);

export default router;
