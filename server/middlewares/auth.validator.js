const Joi = require("joi");
const commonValidator = require("../utils/commonValidator");

exports.signUpValidator = async (req, res, next) => {
    const validator = commonValidator();
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        ...validator,
    });

    try {
        const { value, error } = schema.validate(req.body);
        if (error?.details) {
            console.log("error");
            return res.status(401).json({
                isSuccess: false,
                isError: true,
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

exports.loginValidator = async (req, res, next) => {
    const validator = commonValidator();
    const schema = Joi.object({
        ...validator,
    });

    try {
        const { value, error } = schema.validate(req.body);
        if (error?.details) {
            console.log("error");
            return res.status(401).json({
                isSuccess: false,
                isError: true,
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
