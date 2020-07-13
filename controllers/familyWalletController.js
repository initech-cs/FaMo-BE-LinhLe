const FamilyWallet = require("../models/familyWallet");

exports.createFamilyWallet = async (request, response) => {
    try {
        const user = request.user;
        const familyWallet = await FamilyWallet.create({
            users: [user]
        });
        response.status(200).json({
            status: "Success",
            data: familyWallet
        });
    } catch (error) {
        response.status(400).json({
            status: "Success",
            message: error.message
        });
    };
};