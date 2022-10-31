const authServices = require("../services/auth.services");
const emailServices = require("../services/email.services");
const error = require("../utils/error");
const emailTemplate = require("../template/email.template");
const hashServices = require("../services/hash.services");

exports.signUp = async (req, res, next) => {
    try {
        const verificationToken = hashServices.generateToken(req.body.email, process.env.JWT_KEY, 60 * 60 * 10);

        const user = await authServices.registerService({ ...req.body, token: verificationToken });
        if (!user) throw error();

        console.log(user);
        // let template = emailTemplate(verificationToken);
        // const { requestId } = await emailServices.sendEmail("Email verification", verificationToken, user.email);
        // if (!requestId) throw error();

        return res.status(201).json({
            isSuccess: true,
            isError: false,
            user,
        });
    } catch (err) {
        next(err);
    }
};

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authServices.loginService({ email, password });
        res.status(200).json({
            isSuccess: true,
            isError: false,
            ...user,
        });
    } catch (err) {
        next(err);
    }
};
