const {
  signUpService,
  findUserByEmailService,
} = require("../services/user.service");
const { generateToken } = require("../utils/token");

exports.signUp = async (req, res) => {
  try {
    const user = await signUpService(req.body);

    res.status(200).json({
      status: "Success",
      message: "Successfully signed up",
      data: user,
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Sign up not successful",
      error: error.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        status: "Unauthorized",
        error: "Please provide credentials",
      });
    }

    const user = await findUserByEmailService(email);

    if (!user) {
      return res.status(404).json({
        status: "Not found",
        error: "No user found. Please create an account",
      });
    }

    const isPasswordValid = await user.comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        status: "Unauthorized",
        error: "Password is not correct",
      });
    }

    const token = generateToken(user);
    const { password: pwd, ...others } = user.toObject();

    res.status(200).json({
      status: "Success",
      message: "Successfully logged in",
      data: {
        user: others,
        token,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
      message: "Login not successful",
      error: error.message,
    });
  }
};
