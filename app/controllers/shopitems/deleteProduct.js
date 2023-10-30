const { shopitems } = require("../../models");

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;

    const note = await shopitems.findById(id);

    if (!id) {
      return res.status(400).send({
        success: false,
        error: "No item id in request",
      });
    }

    // this
    //  await shopitems.findByIdAndDelete(id);

    // or this
    const data = await shopitems.deleteOne({ _id: id });

    if (!data.deletedCount) {
      return res.status(404).send({
        success: false,
        error: "No shop item found with that id",
      });
    }

    res.status(200).send({
      success: true,
      message: "Shop item deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      error: err.message,
      message: "Shop item deletion failed unexpectedly",
    });
  }
}

module.exports = deleteProduct;
