const jwt = require('jsonwebtoken');
const User = require('./../models/users')

module.exports = async(req, res, next) => {
    try {
        const decoded = jwt.verify(req.body.token, process.env.JWT_KEY);
        // console.log(decoded, "Decoded user");
        const user = await User.findById(decoded.userId).exec();
        req.userData = user;
        next();
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Token not provided!"
        });
    }
}