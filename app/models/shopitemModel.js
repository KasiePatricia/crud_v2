const mongoose = require("mongoose");

// create a schema
const shopitemsSchema = new mongoose.Schema(
  {
    itemsName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    isInStock: {
      type: Boolean,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  },
  { timestamps: true }
);

// create a modal
const shopitemsCollection = mongoose.model("shopItems", shopitemsSchema);

module.exports = shopitemsCollection;
