const express = require("express");
const router = express.Router();
const {
  createProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} = require("../controllers/shopitems");
const { isAdmin, isUserLoggedIn } = require("../middlewares");

router.post("/add-product", isUserLoggedIn, isAdmin, createProduct);
router.get("/products", isUserLoggedIn, getAllProducts);
router.get("/product/:id", isUserLoggedIn, getProductById);
router.patch("/product/:id", isUserLoggedIn, isAdmin, updateProduct);
router.delete("/product/:id", isUserLoggedIn, isAdmin, deleteProduct);

module.exports = router;
