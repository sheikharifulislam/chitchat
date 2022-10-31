const bcrypt = require("bcrypt");

exports.hashPassword = (password, salt) => {
    return bcrypt.hash(password, salt);
};
