const userServices = require("./user.services");
const error = require("../utils/error");
const hashServices = require("./hash.services");

exports.registerService = async (data) => {
    const user = await userServices.findUserByProperty("email", data.email);
    if (user) {
        throw error("User Already Registered", 400);
    }

    const salt = Math.floor(Math.random() * 10) + 1;
    const hashPassword = await hashServices.hashPassword(data.password, salt);
    return userServices.createNewUser({ ...data, salt, password: hashPassword });
};

exports.loginService = async (data) => {
    const user = await userServices.findUserByProperty("email", data.email);

    if (!user) {
        throw error("Email Or Password Invalid", 400);
    }
    const isMatch = await hashServices.comparePasword(data.password, user.password);

    if (!isMatch) {
        throw error("Email Or Password Invalid", 400);
    }

    return user;
};
