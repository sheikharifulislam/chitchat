const User = require("../models/User");

exports.findUserByProperty = (key, value) => {
    if (key === "id") {
        return User.findById(value);
    }

    return User.findOne({ [key]: value });
};

exports.createNewUser = (data) => {
    return new User({ ...data }).save();
};

exports.updateUser = (filter, data) => {
    return User.updateOne(filter, data);
};
