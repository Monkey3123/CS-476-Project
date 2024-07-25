// userController.js
import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    const token = createToken(user._id);
    const id = user._id;
    const first = user.first;
    const last = user.last;
    res.status(200).json({ id, first, last, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { first, last, email, password } = req.body;

  try {
    const user = await User.signup(first, last, email, password);
    const token = createToken(user._id);
    const id = user._id;
    res.status(200).json({ id, first, last, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select("first last");
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export default loginUser;
export { signupUser, getUserById };
