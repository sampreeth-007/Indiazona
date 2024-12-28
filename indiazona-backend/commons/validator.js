const Joi = require('joi');

const productColors = JSON.parse(process.env.PRODUCT_COLORS);
const productBrands = JSON.parse(process.env.PRODUCT_BRANDS);

let errFormat = {
    errors: [
        {
            code: 400,
            title: 'input validations'
        }
    ]
};


const validatorForProduct = () => {
    return (req, res, next) => {
        const schema = Joi.object({
            size: Joi.number().integer().positive().optional(),
            page: Joi.number().integer().positive().optional(),
            minPrice: Joi.number().integer().positive().allow(0).optional(),
            maxPrice: Joi.number().integer().positive().allow(0).optional(),
            brand: Joi.string()
                .custom((value, helpers) => {
                    const brands = value.split(',').map((item) => item.trim());
                    const invalidBrands = brands.filter((brand) => !productBrands.includes(brand));
                    if (invalidBrands.length > 0) {
                        return helpers.message(
                            `Invalid brand(s): ${invalidBrands.join(', ')}. Allowed values: ${productBrands.join(', ')}`
                        );
                    }
                    return value;
                })
                .optional(),
            color: Joi.string()
                .custom((value, helpers) => {
                    const colors = value.split(',').map((item) => item.trim());
                    const invalidColors = colors.filter((color) => !productColors.includes(color));
                    if (invalidColors.length > 0) {
                        return helpers.message(
                            `Invalid color(s): ${invalidColors.join(', ')}. Allowed values: ${productColors.join(', ')}`
                        );
                    }
                    return value;
                })
                .optional(),
        }).and('minPrice', 'maxPrice');

        var { error } = schema.validate(req.query);
        const valid = error == null;

        if (valid) {
            next();
        } else {
            const { details } = error;
            const message = details.map((i) => i.message).join(',');
            errFormat.errors[0]['detail'] = message;
            return res.status(400).json(errFormat);
        }
    };
};

module.exports = {
    validatorForProduct
};