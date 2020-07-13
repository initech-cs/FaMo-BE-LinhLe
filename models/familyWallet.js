const mongoose = require("mongoose");

const familyWalletSchema = new mongoose.Schema({
    users: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }],
    wallets: [{
        type: mongoose.Schema.ObjectId,
        ref: "Wallet"
    }]
}, {
    timestamps: true
});

const FamilyWallet = mongoose.model("FamilyWallet", familyWalletSchema);
module.exports = FamilyWallet;