
const db = require("../config/db");

const listAllProducts = async (req, res) => {
    try {
        let { queryString, values } = await generateQuery(req.query);
        const data = await db.query(queryString, values);
        if (data && data.length) {
            return res.status(200).send({
                success: true,
                message: "Successfully fetched products data",
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
        return res.status(500).send({
            success: false,
            message: " Error in get all products API",
            error
        });
    }
}

function generateQuery(filters) {
    try {
        const { minPrice, maxPrice, brand, color, page = 1, size = 10 } = filters;

        let queryString = `
        SELECT 
            p.id, 
            p.product_name, 
            b.name AS brand_name, 
            p.color, 
            p.tag_price, 
            p.thumbnail_image_url, 
            p.product_description
        FROM 
            products p
        LEFT JOIN 
            brands b ON p.brand_id = b.id
        WHERE 1=1
    `;

        const conditions = [];
        const values = [];

        // Add price range filter
        if (minPrice !== undefined && maxPrice !== undefined) {
            conditions.push('p.tag_price BETWEEN ? AND ?');
            values.push(minPrice, maxPrice);
        }

        // Handle multiple brands (comma-separated)
        if (brand) {
            const brandList = brand.split(',').map((item) => item.trim()); // Convert to array
            conditions.push(`b.name IN (${brandList.map(() => '?').join(', ')})`);
            values.push(...brandList); // Add each brand as a separate value
        }

        // Handle multiple colors (comma-separated)
        if (color) {
            const colorList = color.split(',').map((item) => item.trim()); // Convert to array
            conditions.push(`p.color IN (${colorList.map(() => '?').join(', ')})`);
            values.push(...colorList); // Add each color as a separate value
        }

        // Combine conditions
        if (conditions.length > 0) {
            queryString += ' AND ' + conditions.join(' AND ');
        }

        // Pagination
        const offset = (page - 1) * size;
        queryString += ` LIMIT ? OFFSET ?`;
        values.push(parseInt(size), parseInt(offset));

        return { queryString, values };
    } catch (error) {
        throw error;
    }
}

module.exports = {
    listAllProducts
};