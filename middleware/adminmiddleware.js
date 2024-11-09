const  jwt  = require("jsonwebtoken");
const { JWT_ADMIN_SECRET } = require("../cofig.js/config");

function adminmiddleware (req, res, next) {
    const authorization = req.headers.authorization;
    const decode = jwt.verify(authorization, JWT_ADMIN_SECRET);

    if(decode){
        req.userId = decode.id;
        next()
    }else{
        res.status(404).json({
            message: "Admin not signed in"
        })
    }
}

module.exports = {
    adminmiddleware: adminmiddleware
}