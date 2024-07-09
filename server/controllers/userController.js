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
    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const signupUser = async (req, res) => {
  const { first, last, email, password } = req.body;

  //res.json({ mssg: "signup user" });
  try {
    const user = await User.signup(first, last, email, password);
    const token = createToken(user._id);
    res.status(200).json({ first, last, email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default loginUser;
export { signupUser };
