const Wallet = require("../models/wallet");
const FamilyWallet = require("../models/familyWallet");

exports.createWallet = async (request, response) => {
    try {
        const { type, balance, name, familyWalletId } = request.body;
        if (!type || !balance || !familyWalletId) throw new Error("Type, balance and familyWalletId is required");
        const familyWallet = await FamilyWallet.findById({ _id: familyWalletId });
        if (!familyWallet) throw new Error("Undefined family wallet");
        const wallet = await Wallet.create({
            type: type,
            name: name,
            balance: balance,
            familyWallet: familyWalletId
        });
        await familyWallet.wallets.push(wallet);
        response.status(200).json({
            status: "Success",
            data: { wallet, familyWallet }
        });
    } catch (error) {
        response.status(400).json({
            status: "Success",
            message: error.message
        });
    };
};