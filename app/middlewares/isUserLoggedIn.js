const config = require("../config/auth.config");
const jwt = require("jsonwebtoken");

const isUserLoggedIn = (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).send({
      error: "No authorization header",
    });
  }

  const [authType, token] = authorizationHeader.split(" ");

  if (authType == "Bearer") {
    const decoded = jwt.verify(token, config.secret);
    req.decoded = decoded;
    next();
    return;
  }

  res.status(401).send({
    error: "User unauthorized!",
  });
};

module.exports = isUserLoggedIn;
