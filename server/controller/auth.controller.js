const authServices = require("../services/auth.services");
const emailServices = require("../services/email.services");
const error = require("../utils/error");
const hashServices = require("../services/hash.services");
const sendResponse = require("../utils/sendResponse");
const transformResponse = require("../utils/transformResponse");

exports.signUp = async (req, res, next) => {
    try {
        const verificationToken = hashServices.generateToken(req.body.email, process.env.JWT_KEY, 60 * 60 * 10);
        let user = await authServices.registerService({ ...req.body, token: verificationToken });
        if (!user) {
            throw error();
        }

        // const { requestId } = await emailServices.sendEmail("Email verification", verificationToken, user.email);
        // if (!requestId) throw error();

        const response = transformResponse(["salt", "password"], user);

        return res.status(201).json(sendResponse({ user: response }));
    } catch (err) {
        next(err);
    }
};

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await authServices.loginService({ email, password });
        const payload = {
            _id: user._id,
            email: user.email,
            name: user.name,
            role: user.role,
            accountStatus: user.accountStatus,
        };

        const token = hashServices.generateToken(payload, process.env.JWT_KEY, 60 * 10);

        const response = transformResponse(["salt", "password"], user);

        res.cookie(process.env.ACCESS_TOKEN_NAME, token, {
            path: "/",
            maxAge: 10000,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json(sendResponse({ user: response, token }));
    } catch (err) {
        next(err);
    }
};
