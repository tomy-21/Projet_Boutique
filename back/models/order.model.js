import mongoose from 'mongoose';

const orderItemSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true }
}, { _id: false });

const shippingSchema = new mongoose.Schema({
  street: String,
  city: String,
  postalCode: String,
  country: String,
}, { _id: false });

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  total: { type: Number, required: true },
  currency: { type: String, default: 'EUR' },
  shippingAddress: shippingSchema,
  status: { type: String, enum: ['pending', 'paid', 'shipped', 'delivered'], default: 'pending' }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
