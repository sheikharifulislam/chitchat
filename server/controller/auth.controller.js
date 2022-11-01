const authServices = require("../services/auth.services");
const emailServices = require("../services/email.services");
const error = require("../utils/error");
const hashServices = require("../services/hash.services");
const sendResponse = require("../utils/sendResponse");
const transformResponse = require("../utils/transformResponse");

exports.signUp = async (req, res, next) => {
    try {
        const verificationToken = hashServices.generateToken(req.body.email, process.env.JWT_KEY, 60 * 60 * 10);

        const user = await authServices.registerService({ ...req.body, token: verificationToken });
        if (!user) throw error();
        delete user.password;
        delete user.salt;

        // let template = emailTemplate(verificationToken);
        // const { requestId } = await emailServices.sendEmail("Email verification", verificationToken, user.email);
        // if (!requestId) throw error();\

        const response = transformResponse(["salt", "password"], user);

        return res.status(201).json(sendResponse("user", response));
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
