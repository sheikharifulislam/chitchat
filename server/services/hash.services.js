const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");

exports.hashPassword = (password, salt) => {
    return bcrypt.hash(password, salt);
};

exports.generateToken = (data, privateKey, exp) => {
    return jwt.sign(
        {
            data,
        },
        privateKey,
        { expiresIn: exp }
    );
};
