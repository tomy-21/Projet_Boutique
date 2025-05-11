import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const getCart = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  res.json(cart || { items: [] });
};

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = new Cart({ user: req.user.id, items: [] });
  }

  const index = cart.items.findIndex(i => i.product.toString() === productId);
  if (index > -1) {
    cart.items[index].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }

  await cart.save();
  res.status(200).json(cart);
};

export const updateCartItem = async (req, res) => {
  const { quantity } = req.body;
  const cart = await Cart.findOne({ user: req.user.id });

  const item = cart.items.id(req.params.itemId);
  if (item) {
    item.quantity = quantity;
    await cart.save();
    res.json(cart);
  } else {
    res.status(404).json({ message: 'Item not found' });
  }
};

export const removeCartItem = async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id });
  cart.items.id(req.params.itemId).remove();
  await cart.save();
  res.json(cart);
};
