const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");
const { ObjectId } = mongoose.Schema.Types;

const walletSchema = new Schema(
  {
    user: {
      email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Provide a valid Email"],
      },
      id: {
        type: ObjectId,
        ref: "User",
        required: true,
        unique: true,
      },
    },

    balance: { type: Number, required: true, default: 0 },

    transactions: [
      {
        amount: { type: Number, required: true },
        type: { type: String, enum: ["credit", "debit"], required: true },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Wallet = mongoose.model("Wallet", walletSchema);
module.exports = Wallet;
