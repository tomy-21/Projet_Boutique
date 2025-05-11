import express from 'express';
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from '../controllers/wishlist.controller.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

router.use(protect);
router.get('/', getWishlist);
router.post('/add/:productId', addToWishlist);
router.delete('/remove/:productId', removeFromWishlist);

export default router;
