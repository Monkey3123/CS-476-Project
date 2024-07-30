import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = mongoose.Schema;

const userSchema = new Schema({
  first: {
    type: String,
    required: true,
  },

  last: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Email Incorrect");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Password Incorrect");
  }

  return user;
};
const User = mongoose.model("User", userSchema);
export default User;
