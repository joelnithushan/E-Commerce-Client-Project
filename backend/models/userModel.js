import mongoose from "mongoose";
import validator from "validator";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

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
        "Invalid name, Please enter name with greater than 3 characters",
      ],
    },
    email: {
      type: String,
      required: [true, "Please enter your email address"],
      unique: true,
      validate: [validator.isEmail, "Please enter valid email address"],
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minLength: [8, "Password should be greater than 8 characters"],
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
      default: "user",
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  this.password = await bcryptjs.hash(this.password, 10);
  //next();
});

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

userSchema.methods.verifyPassword = async function(userPassword) {
  return await bcryptjs.compare(userPassword, this.password);
};

export default mongoose.model("User", userSchema);
