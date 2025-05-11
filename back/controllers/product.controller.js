import Product from '../models/product.model.js';

// Get all products with filters, search, pagination & sorting
export const getAllProducts = async (req, res) => {
  try {
    const {
      name, gender, type, color, size, sort, page = 1, limit = 10
    } = req.query;

    const query = {};
    if (name) query.name = new RegExp(name, 'i');
    if (gender) query['characteristics.gender'] = gender;
    if (type) query['characteristics.type'] = type;
    if (color) query['characteristics.colors'] = color;
    if (size) query['characteristics.sizes'] = size;

    const sortQuery = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};

    const products = await Product.find(query)
      .sort(sortQuery)
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProduct = async (req, res) => {
  try {
    const images = req.files.map(file => file.path);
    const product = new Product({ ...req.body, images });
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const images = req.files?.map(file => file.path);
    const data = { ...req.body };
    if (images && images.length) data.images = images;

    const updated = await Product.findByIdAndUpdate(req.params.id, data, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
