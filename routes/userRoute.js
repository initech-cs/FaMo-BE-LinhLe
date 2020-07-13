var express = require('express');
const { getUsersList, createUser, logIn, logOut, updateMyProfile, getMyProfile } = require('../controllers/userController');
const { loginRequired } = require('../services/authenticationService');
var router = express.Router();

router.route("/users").get(getUsersList).post(createUser);

router.route("/users/me").get(loginRequired, getMyProfile)
    .post(loginRequired, updateMyProfile);

router.route("/api/login").post(logIn);

router.route("/api/logout").post(loginRequired, logOut);

module.exports = router;
