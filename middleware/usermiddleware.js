const jwt  = require("jsonwebtoken");
const { JWT_USER_SECRET } = require("../cofig.js/config");

function usermiddlewre(req, res, next){
    const authorization = req.headers.authorization;
    const decode = jwt.verify(authorization, JWT_USER_SECRET);

    if (decode) {
        req.userId =decode.id;
        next()
    }else{
        res.status(404).json({
            message: "user not signed in"
        })
    }
}

module.exports = {
    usermiddlewre: usermiddlewre
}