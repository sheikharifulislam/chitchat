const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

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

exports.verifyJwt = (token, secretKey) => {
    return jwt.verify(token, secretKey);
};

exports.hashToken = (data) => {
    return CryptoJS.SHA512(data);
};
