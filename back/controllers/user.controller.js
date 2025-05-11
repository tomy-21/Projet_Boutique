import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password } = req.body;
  const user = new User({ email, password });
  await user.save();
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.status(201).json({ token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
  res.json({ token });
};
