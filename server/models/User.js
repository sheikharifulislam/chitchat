const { Schema, model } = require("mongoose");

const userSchema = Schema({
    name: {
        type: String,
        min: [3, "User name length must be at least 3 character"],
        unique: true,
        required: [true, "User name required"],
    },
    email: {
        type: String,
        unique: true,
        required: [true, "User email required"],
    },
    mobile: {
        type: String,
        min: [7, "Must be at least 7 digit"],
        max: [15, ""],
        unique: true,
        required: [true, "User mobile number required"],
    },
    password: {
        type: String,
        min: [8, "Must be at least 8 character"],
        required: [true, "User Password required"],
    },
    role: {
        type: String,
        enum: ["ADMIN,USER"],
        default: "USER",
        required: true,
    },
    salt: {
        type: Number,
        required: [true, ""],
    },
    isOnline: {
        type: Boolean,
        default: false,
        required: [true],
    },
    lastActive: {
        type: Date,
        default: Date.now(),
        required: [true],
    },
});

const User = model("user", userSchema);
module.exports = User;
