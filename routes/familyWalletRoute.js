var express = require('express');
const { loginRequired } = require('../services/authenticationService');
const { createFamilyWallet } = require('../controllers/familyWalletController');
const { createWallet } = require('../controllers/walletController');
var router = express.Router();

router.route("/familywallets").post(loginRequired, createFamilyWallet);

router.route("/familywallets/wallets").post(loginRequired, createWallet);

module.exports = router;
