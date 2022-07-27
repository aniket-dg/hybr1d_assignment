const jwt = require('jsonwebtoken');
module.exports = async(req, res, next) => {
    try {
        const user = req.userData;
        if(user && user.seller){
            next();
        }
        else{
            return res.status(401).json({
                message: "Unauthorized Access"
            });    
        }
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            message: "Token not provided!"
        });
    }
}