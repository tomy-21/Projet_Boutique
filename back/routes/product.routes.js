import express from 'express';
import multer from 'multer';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/product.controller.js';
import { protect } from '../utils/auth.js';

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', protect, upload.array('images', 3), createProduct);
router.put('/:id', protect, upload.array('images', 3), updateProduct);
router.delete('/:id', protect, deleteProduct);

export default router;
