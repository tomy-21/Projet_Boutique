import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
} from '../controllers/cart.controller.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update/:itemId', updateCartItem);
router.delete('/remove/:itemId', removeCartItem);

export default router;
