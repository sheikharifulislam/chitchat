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
