const authServices = require("../services/auth.services");
const emailServices = require("../services/email.services");
const error = require("../utils/error");
const hashServices = require("../services/hash.services");
const sendResponse = require("../utils/sendResponse");
const transformResponse = require("../utils/transformResponse");
const userServices = require("../services/user.services");
const emailVerificationTemplate = require("../template/verifyEmail.template");
const forgotPasswordTemplate = require("../template/forgotPassword.template");

exports.signUp = async (req, res, next) => {
    try {
        const verificationToken = hashServices.hashToken(req.body.email);

        let user = await authServices.registerService({ ...req.body, verifyToken: { token: verificationToken } });

        if (!user) {
            throw error();
        }

        const result = await emailServices.sendEmail(
            user.email,
            "Email verification",
            emailVerificationTemplate(verificationToken)
        );

        if (!result.messageId) {
            throw error();
        }

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

exports.verifyEmail = async (req, res, next) => {
    const { token } = req;

    try {
        const user = await userServices.updateUser(
            {
                $and: [{ "verifyToken.token": token }, { "verifyToken.date": { $gt: `${new Date().toISOString()}` } }],
            },
            {
                $set: {
                    accountStatus: "ACTIVE",
                },
                $unset: {
                    verifyToken: "",
                },
            }
        );

        if (!user.modifiedCount) {
            throw error("Invalid Token", 401);
        }

        res.status(200).send();
    } catch (error) {
        next(error);
    }
};

exports.forgotPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const resetToken = hashServices.hashToken(email);

        const user = await userServices.updateUser(
            { email },
            {
                $set: { forgotPasswordToken: { token: resetToken } },
            }
        );

        if (!user.modifiedCount) {
            throw error("Invalid Email Address", 401);
        }

        const emailRes = await emailServices.sendEmail(email, "Forgot Password", forgotPasswordTemplate(resetToken));
        if (!emailRes.messageId) {
            throw error();
        }

        res.status(200).json({
            message: "If your email address is in our system, the email will send to you",
        });
    } catch (error) {
        next(error);
    }
};

exports.resetPassword = async (req, res, next) => {
    const { token } = req;
    const { password } = req.body;
    try {
        const salt = Math.floor(Math.random() * 10);
        const hashPassword = await hashServices.hashPassword(password, salt);
        const user = await userServices.updateUser(
            {
                $and: [
                    { "forgotPasswordToken.token": token },
                    { "forgotPasswordToken.date": { $gt: `${new Date().toISOString()}` } },
                ],
            },
            {
                $set: {
                    salt,
                    password: hashPassword,
                },

                $unset: {
                    forgotPasswordToken: "",
                },
            }
        );

        if (!user.modifiedCount) {
            throw error("Invalid Token", 401);
        }

        res.status(200).send();
    } catch (error) {
        next(error);
    }
};
