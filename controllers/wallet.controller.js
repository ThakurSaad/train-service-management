const {
  createWalletService,
  getWalletByEmailService,
  getBalanceService,
  addBalanceService,
} = require("../services/wallet.service");

exports.createWallet = async (req, res) => {
  try {
    const wallet = await createWalletService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Wallet created",
      data: wallet,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Wallet not created",
      error: error.message,
    });
  }
};

exports.getWalletByEmail = async (req, res) => {
  try {
    const wallet = await getWalletByEmailService(req.params.email);

    if (!wallet) {
      return res.status(404).json({
        status: "Not found",
        message: "Wallet not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Wallet found",
      data: wallet,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Wallet not found",
      error: error.message,
    });
  }
};

exports.getBalance = async (req, res) => {
  try {
    const balance = await getBalanceService(req.params.email);

    if (balance === null) {
      return res.status(404).json({
        status: "Not found",
        message: "Wallet not found",
      });
    }

    res.status(200).json({
      status: "Success",
      message: "Wallet found",
      data: balance,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Wallet not found",
      error: error.message,
    });
  }
};

exports.addBalance = async (req, res) => {
  try {
    const balance = await addBalanceService(
      req.params.email,
      parseInt(req.body.amount)
    );

    res.status(200).json({
      status: "Success",
      message: "Balance increased",
      data: balance,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Balance not increased",
      error: error.message,
    });
  }
};
