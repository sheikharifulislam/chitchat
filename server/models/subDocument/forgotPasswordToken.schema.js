const { Schema } = require("mongoose");

const forgotPasswordTokenSchema = new Schema({
    token: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now() * 60000 * 15,
    },
});

module.exports = forgotPasswordTokenSchema;
