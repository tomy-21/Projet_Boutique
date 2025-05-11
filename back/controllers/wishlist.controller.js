import User from '../models/user.model.js';

export const getWishlist = async (req, res) => {
  const user = await User.findById(req.user.id).populate('wishlist');
  res.json(user.wishlist || []);
};

export const addToWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user.wishlist.includes(req.params.productId)) {
    user.wishlist.push(req.params.productId);
    await user.save();
  }
  res.status(200).json(user.wishlist);
};

export const removeFromWishlist = async (req, res) => {
  const user = await User.findById(req.user.id);
  user.wishlist = user.wishlist.filter(id => id.toString() !== req.params.productId);
  await user.save();
  res.json(user.wishlist);
};
