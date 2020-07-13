const mongoose = require("mongoose");

const walletSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    balance: {
        type: Number,
        required: [true, "Current amount is required"]
    },
    type: {
        type: String,
        enum: ["Bank", "Cash", "Visa", "Deposit"],
        required: [true, "Type is required"],
        trim: true
    },
    familyWallet: {
        type: mongoose.Schema.ObjectId,
        ref: "FamilyWallet",
        required: [true, "At least add 1 wallet"]
    }
}, {
    timestamps: true
});

const Wallet = mongoose.model("Walet", walletSchema);
module.exports = Wallet;