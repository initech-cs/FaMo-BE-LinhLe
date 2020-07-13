const User = require("../models/user");
const saltRounds = 10;
const bcrypt = require("bcrypt");
const { generateToken, loginWithEmail } = require("../services/authenticationService");

exports.getUsersList = async (request, response) => {
    const usersList = await User.find({});
    response.status(200).json({
        status: "Success",
        data: usersList
    });
};

exports.createUser = async (request, response) => {
    try {
        const { firstName, lastName, email, password } = request.body;
        if (!firstName || !lastName || !email || !password) throw new Error("First name, last name, email & password are required");
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const user = await User.create({
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: hashedPassword
        });
        const token = await generateToken(user)
        response.status(201).json({
            status: "Success",
            data: { user, token }
        });
    } catch (error) {
        response.status(400).json({
            status: "Failed",
            message: error.message
        });
    };
};

exports.getMyProfile = async (request, response) => {
    const user = request.user
    response.status(200).json({
        status: "Success",
        data: user
    });
};

exports.updateMyProfile = async (request, response) => {
    try {
        const { firstName, lastName, password } = request.body;
        const user = request.user;
        if (firstName) {
            user.firstName = firstName;
        };
        if (lastName) {
            user.lastName = lastName;
        };
        if (password) {
            user.password = password;
        };
        await user.save();
        response.status(200).json({
            status: "Success",
            data: user
        });
    } catch (error) {
        response.status(400).json({
            status: "Success",
            message: error.message
        });
    };
};

exports.logIn = async (request, response) => {
    const { email, password } = request.body
    if (!email || !password) throw new Error("Email and password are required");
    const user = await loginWithEmail(email, password);
    const token = await generateToken(user);
    response.status(200).json({
        status: "Success",
        data: { user, token }
    });
};

exports.logOut = async (request, response) => {
    const { token } = request.body;
    if (!token) throw new Error("Token is required");
    const user = request.user;
    user.token = user.tokens.filter(elm => elm !== token);
    await user.save();
    response.status(200).json({
        status: "Success",
        data: user
    });
};