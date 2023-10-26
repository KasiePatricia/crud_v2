const mongoose = require("mongoose");
const userCollection = require("./userModel");
const shopitemCollection = require("./shopitemModel");

mongoose.set("strictQuery", false);
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.users = userCollection;
db.shopitems = shopitemCollection;

module.exports = db;
