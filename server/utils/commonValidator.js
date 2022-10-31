const Joi = require("joi");

function commonValidator() {
    return {
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
    };
}

module.exports = commonValidator;
