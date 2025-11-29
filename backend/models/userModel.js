import mongoose from "mongoose";
import validator, { isPassportNumber, isStrongPassword } from "validator";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
      maxLength: [
        25,
        "Invalid name, Please enter name with less than 25 characters",
      ],
      minLength: [
        3,
        "Invalid name, Please enter name with grater than 3 characters",
      ],
    },
    email: {
      type: email,
      required: [true, "Please enter yoru email adress"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: password,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be grater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    role: {
      type: String,
      default: "User",
    },
    resetPasswordToken: String,
    resetPAsswordExpire: Date,
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
