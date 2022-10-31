const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.hashPassword = (password, salt) => {
    return bcrypt.hash(password, salt);
};

exports.generateToken = (payload, privateKey, exp) => {
    return jwt.sign(
        {
            data: { ...payload },
        },
        privateKey,
        { expiresIn: exp }
    );
};

exports.comparePasword = (password, userPassword) => {
    return bcrypt.compare(password, userPassword);
};