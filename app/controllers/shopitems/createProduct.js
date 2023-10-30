const { shopitems } = require("../../models");
const expectedTypes = require("../../data/shopitemTypes");

async function createProduct(req, res) {
  try {
    const { itemsName, description, price, isInStock } = req.body;
    const { userId } = req.decoded;

    if (
      !itemsName ||
      !description ||
      price == undefined ||
      isInStock == undefined
    ) {
      const errorObj = {};
      const body = { itemsName, description, price, isInStock };

      for (let key in body) {
        if (body[key] == undefined || body[key] === "") {
          errorObj[key] = `${key} must be available in request`;
        }
      }

      return res.status(400).send({
        success: false,
        error: errorObj,
        message: "Shop item creation failed due to missing fields",
      });
    }

    if (
      typeof itemsName !== "string" ||
      typeof description !== "string" ||
      typeof price !== "number" ||
      typeof isInStock !== "boolean"
    ) {
      const errorObj = {};
      const body = { itemsName, description, price, isInStock };

      for (let key in body) {
        if (typeof body[key] !== expectedTypes[key]) {
          errorObj[key] = `${key} should be ${expectedTypes[key]}`;
        }
      }

      return res.status(400).send({
        success: false,
        error: errorObj,
        message: "Shop item creation failed due to datatype mismatch",
      });
    }

    // create a product
    const newProduct = await shopitems.create({
      itemsName,
      description,
      price,
      isInStock,
      createdBy: req.decoded,
      user: userId,
    });

    res.status(201).send({
      success: true,
      message: "Shop item created successfully",
      data: {
        newProduct,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: "Shop item creation failed unexpectedly",
    });
  }
}

module.exports = createProduct;
