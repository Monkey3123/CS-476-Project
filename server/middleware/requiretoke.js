import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

const requiretoke = async (req, res, next) => {
  const { toke } = req.headers;

  if (!toke) {
    return res.status(401).json({ error: "missing token/login" });
  }

  const newToke = toke.split(" ")[1];

  try {
    const { _id } = jwt.verify(newToke, process.env.SECRET);

    req.user = await User.findOne({ _id }).select("_id");
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Not Authorized/failed verification" });
  }
};

export default requiretoke;
