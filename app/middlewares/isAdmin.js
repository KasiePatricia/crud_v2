const isAdmin = (req, res, next) => {
    if (req.decoded.role === "admin") {
        next();
    } else {
        res.status(403).send("action-not-allowed")
    }
}

module.exports = isAdmin;