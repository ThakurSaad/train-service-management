const jwt = require("jsonwebtoken");

exports.generateToken = (user) => {
  const payload = {
    _id: user._id,
    email: user.email,
    role: user.role,
  };

  const token = jwt.sign(
    payload,
    "dbb6821291aa3372f3d73fb149e61b7fb9eb9f84c01bfc984a001d81389fb8d46a49223f2cb4431521e5addc40424d360405a938fe270b59926cff1ce81928ff",
    {
      expiresIn: "1h",
    }
  );

  return token;
};
