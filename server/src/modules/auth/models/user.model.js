import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: [true, "Email already exists"],
      trim: true,
      lowercase: true,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must contain at least 6 characters"],
    },
    username: {
      type: String,
      minLength: [2, "Username must contain at least 2 characters"],
      maxLength: [50, "Username must be shorter than 51 characters"],
      required: [true, "Username is missing"],
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.model("User", userSchema);
export default User;
