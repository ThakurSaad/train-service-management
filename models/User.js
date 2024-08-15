const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcrypt");

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      validate: [validator.isEmail, "Provide a valid Email"],
      trim: true,
      unique: true,
      required: [true, "Email address is required"],
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      validate: {
        validator: (value) =>
          validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 3,
            minNumbers: 1,
            minUppercase: 1,
            minSymbols: 1,
          }),
        message:
          "Password {VALUE} is not strong enough. It should have at least 6 characters, including 3 lowercase letters, 1 uppercase letter, 1 number, and 1 symbol.",
      },
    },

    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },

    wallet: {
      type: ObjectId,
      ref: "Wallet",
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", function (next) {
  const password = this.password;
  const saltRounds = 10;

  const salt = bcrypt.genSaltSync(saltRounds);
  const hashedPassword = bcrypt.hashSync(password, salt);

  this.password = hashedPassword;

  next();
});

userSchema.methods.comparePassword = function async(password, hash) {
  const isPasswordValid = bcrypt.compareSync(password, hash);
  return isPasswordValid;
};

const User = mongoose.model("User", userSchema);

module.exports = User;
