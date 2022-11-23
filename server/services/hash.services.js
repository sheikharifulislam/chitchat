const bcrypt = require("bcrypt");
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

exports.RandomHashStr = () => {
    return CryptoJS.algo.SHA256.create().finalize();
};

exports.verifyJwt = (token, secretKey) => {
    return jwt.verify(token, secretKey);
};
