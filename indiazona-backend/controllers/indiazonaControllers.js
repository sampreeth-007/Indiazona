
const db = require("../config/db");

const getAllProducts = async (req, res) => {
    try {
        const data = await db.query("SELECT * FROM products");
        if (data && data.length) {
            return res.status(200).send({
                success: true,
                message: "All Products data",
                totalProducts: data[0].length,
                data: data[0]
            });
        } else {
            return res.status(404).send({
                success: false,
                message: "No products found"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: " Error in get all products API",
            error
        });
    }
}

module.exports = {
    getAllProducts
};