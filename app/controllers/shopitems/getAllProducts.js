const { shopitems } = require("../../models");


async function getAllProducts(req, res) {
    try {
        const data = await shopitems.find();

        res.status(200).send({
            success: true,
            data: {
                data
            },
            message: "All products fetched successfully"
        })
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message,
            message: "Shop items fetching failed unexpectedly"
        })
    }
}

module.exports = getAllProducts;