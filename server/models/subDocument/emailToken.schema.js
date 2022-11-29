const { Schema } = require("mongoose");

const emailTokenSchema = new Schema({
    token: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now() + 60000 * 15,
    },
});

module.exports = emailTokenSchema;
