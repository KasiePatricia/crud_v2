const config = require("../../config/auth.config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { users } = require("../../models");

const login = async (req, res) => {
    try {
        const { userName, password } = req.body;

        const userDetails = await users.findOne({ userName });

        if (!userDetails) {
            return res.status(404).send({
                success: false,
                error: "User not found",
                message: "Login failed"
            })
        }

        const passwordMatches = bcrypt.compareSync(password, userDetails.password);

        if (!passwordMatches) {
            return res.status(400).send({
                success: false,
                error: "Invalid credentials",
                message: "Login failed"
            })
        }

        const token = jwt.sign({
            userid: userDetails.id,
            userName,
            role: userDetails.role
        }, config.secret);

        const user = {
            id: userDetails._id,
            fullName: userDetails.fullName,
            userName: userDetails.userName,
            role: userDetails.role,
            createdAt: userDetails.createdAt,
            updatedAt: userDetails.updatedAt,
            __v: userDetails.__v
        }

        return res.status(200).send({
            success: true,
            message: "Login successful",
            data: {
                user
            },
            token
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message,
            message: "Login failed unexpectedly!"
        })
    }
}

module.exports = login;