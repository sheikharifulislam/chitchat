const User = require("../models/User");
const authServices = require("../services/auth.services");
const emailServices = require("../services/email.services");
const error = require("../utils/error");

exports.signUp = async (req, res, next) => {
    const salt = Math.floor(Math.random() * 10) + 1;
    const password = await authServices.hashPassword(req.body.password, salt);
    try {
        const user = await new User({ ...req.body, salt, password }).save();
        if (!user) throw error();
        const { requestId } = await emailServices.sendEmail("Email verification", "email verify", user.email);
        if (!requestId) throw error();
        return res.status(201).json(user);
    } catch (err) {
        next(err);
    }
};
