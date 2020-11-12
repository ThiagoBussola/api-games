const jwt = require("jsonwebtoken");

const JWTSecret = "testandoAuthJWT"

function Authentication(req, res, next){
    const headerToken = req.headers.authorization;

    if(!headerToken) {
        res.sendSatus(401)
    }else {
        let token = headerToken.split(' ')
        
        jwt.verify(token[1], JWTSecret, (err, data) => {
            if(err) {
                res.status(401)
                res.json({err: "Invalid Token"})
            } else {
                console.log(data)
                req.loggedUser = {token, email: data.email, id: data.id};
                next();
            }
        })

    }
    
}

module.exports = Authentication