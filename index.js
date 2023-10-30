const express = require("express");
const mongoose = require("mongoose");
// import the routes
const authRoute = require("./app/routes/auth");
const shopRoute = require("./app/routes/shop");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

// connect to database
const { mongoUserName, password, clusterName, dbName } = process.env;
const mongoDB_URI = `mongodb+srv://${mongoUserName}:${password}@${clusterName}.mongodb.net/${dbName}`;
// console.log(mongoDB_URI);

mongoose
  .connect(mongoDB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected!"))
  .catch((err) => console.log(`Error connecting to database! `, err));

//  middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send("Very Basic E-Commerce App database is online!");
});

// routes
app.use("/auth", authRoute);
app.use("/shop", shopRoute);

app.listen(port, () => console.log("listening on port", port));
