const { shopitems } = require("../../models");


async function getProductById(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({
                success: false,
                error: "No item id in request",
            })
        }

        const data = await shopitems.findById(id);

        if (!data) {
            return res.status(404).send({
                success: false,
                error: "No shop item found with that id"
            })
        }

        res.status(200).send({
            success: true,
            data: {
                data
            },
            message: "Shop item fetched successfully"
        })

    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            error: err.message,
            message: "Shop item fetching failed unexpectedly"
        })
    }
}

module.exports = getProductById;