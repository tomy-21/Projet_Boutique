import Order from '../models/order.model.js';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

export const placeOrder = async (req, res) => {
  const userId = req.user.id;
  const { shippingAddress } = req.body;

  const cart = await Cart.findOne({ user: userId }).populate('items.product');
  if (!cart || !cart.items.length) return res.status(400).json({ message: 'Empty cart' });

  let total = 0;

  for (const item of cart.items) {
    if (item.product.stock < item.quantity) {
      return res.status(400).json({ message: `Not enough stock for ${item.product.name}` });
    }
    item.product.stock -= item.quantity;
    await item.product.save();

    const priceAfterDiscount = item.product.price * (1 - (item.product.discount || 0) / 100);
    total += priceAfterDiscount * item.quantity;
  }

  const order = new Order({
    user: userId,
    items: cart.items.map(i => ({ product: i.product._id, quantity: i.quantity })),
    total,
    currency: 'EUR',
    shippingAddress
  });

  await order.save();
  await Cart.findOneAndDelete({ user: userId });

  res.status(201).json(order);
};

export const getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate('items.product');
  res.json(orders);
};
