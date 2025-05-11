import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  reference: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: {
    type: String,
    required: true,
    minlength: 200,
    maxlength: 500,
  },
  stock: { type: Number, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // en pourcentage
  currency: { type: String, default: 'EUR' },
  images: [{ type: String, required: true }], // URLs ou chemins relatifs
  characteristics: {
    gender: { type: String, enum: ['homme', 'femme'], required: true },
    type: { type: String, required: true },
    colors: [{ type: String, required: true }],
    sizes: [{ type: String }],
    material: { type: String },
  },
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
