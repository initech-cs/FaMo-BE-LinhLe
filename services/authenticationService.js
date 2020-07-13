const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcrypt");

exports.generateToken = async (user) => {
    const token = jwt.sign({
        _id: user._id
    },
        process.env.SECRET,
        { expiresIn: "7d" }
    );
    user.tokens.push(token);
    await user.save();
    return token;
};

exports.loginWithEmail = async (email, password) => {
    const user = await User.findOne({ email: email });
    if (!user) throw new Error("Undefined user");
    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new Error("Wrong email or password");
    return user;
};

exports.loginRequired = async (request, response, next) => {
    if (!request.headers.authorization || !request.headers.authorization.startsWith("Bearer ")) {
        return response.status(401).json({
            status: "Fail",
            error: "Unauthorized"
        });
    };
    const token = request.headers.authorization.replace("Bearer ", "");
    try {
        const decode = jwt.verify(token, process.env.SECRET);
        const user = await User.findOne({ _id: decode._id, tokens: token });
        if (!user) throw new Error("Unauthorized");
        request.user = user;
        request.token = token;
        next();
    } catch (err) {
        response.status(401).json({
            status: "Fail",
            error: err.message
        });
    };
};
