const bcrypt = require("bcryptjs");
const { users } = require("../../models");

async function register(req, res) {
  try {
    const { fullName, userName, password, role } = req.body;

    // if (!fullName || !userName || !password || !role) {
    //   const errorObj = {};
    //   const body = { fullName, userName, password, role };

    //   for (let key in body) {
    //     if (body[key] === " ") {
    //       errorObj[key] = `${key} must be available in request`;
    //     }
    //   }

    //   return res.status(400).send({
    //     success: false,
    //     error: errorObj,
    //     message: "Shop item update failed due to missing fields",
    //   });
    // }

    if (
      typeof fullName !== "string" ||
      typeof userName !== "string" ||
      typeof password !== "string" ||
      !["user", "admin"].includes(role)
    ) {
      const errorObj = {};
      const body = { fullName, userName, password, role };

      for (let key in body) {
        if (typeof body[key] !== "string") {
          errorObj[key] = `${key} should be ${"string"}`;
        }
      }

      return res.status(400).send({
        success: false,
        error: errorObj,
        message: "Shop item update failed due to datatype mismatch",
      });
    }

    const existingUserName = await users.findOne({ userName });

    if (existingUserName) {
      return res.status(409).send({
        success: false,
        error: "Username already exists",
        message: "Sign up failed!",
      });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // register
    await users.create({
      fullName,
      userName,
      password: hashedPassword,
      role,
    });

    res.status(201).send({
      success: true,
      message: "User account created successfully!",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send({
      success: false,
      error: err.message,
      message: "Sign up failed unexpectedly!",
    });
  }
}

module.exports = register;
