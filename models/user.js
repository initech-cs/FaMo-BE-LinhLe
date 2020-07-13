const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is required"]
    },
    tokens: {
        type: [],
        unique: true,
        trim: true
    },
}, {
    timestamps: true
});
const User = mongoose.model("User", userSchema);
module.exports = User;