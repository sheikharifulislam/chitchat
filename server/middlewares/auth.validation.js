const Joi = require("joi");

const authValidation = async (req, res, next) => {
    // console.log(req.body);
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        email: Joi.string()
            .regex(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)
            .required()
            .messages({
                "any.required": "email address is required",
            }),
        password: Joi.string()
            .min(8)
            .regex(/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/)
            .required(),
    });

    try {
        const { value, error } = schema.validate(req.body);
        if (error?.details) {
            return res.status(401).json({
                error: {
                    message: error?.details[0].message,
                },
            });
        }

        req.body = value;
        next();
    } catch (error) {
        next(error);
    }
};

module.exports = authValidation;
