const User = require("../models/User");
const Wallet = require("../models/Wallet");

exports.createWalletService = async (walletInfo) => {
  const { email } = walletInfo.user;

  const wallet = await Wallet.create(walletInfo);

  const user = await User.findOne({ email });

  user.wallet = wallet._id;
  await user.save();

  return wallet;
};

exports.getWalletByEmailService = async (email) => {
  const wallet = await Wallet.findOne({ "user.email": email });
  return wallet;
};

exports.getBalanceService = async (email) => {
  return await Wallet.findOne({ "user.email": email }, { balance: 1, _id: 0 });
};

exports.addBalanceService = async (email, amount) => {
  const balance = await Wallet.findOneAndUpdate(
    { "user.email": email },
    {
      $inc: { balance: amount },
      $push: {
        transactions: {
          amount: amount,
          type: "credit",
          date: new Date(),
        },
      },
    },
    { returnDocument: "after", projection: { balance: 1 } }
  );
  return balance;
};
