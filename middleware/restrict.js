const jwt = require("jsonwebtoken")

module.exports = function restrict(){
    return async (req, res, next) => {
        const token = req.headers.authorization
        if (token){
            jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
                if(err){
                    res.status(401).json({ message: "this is restricted to you" })
                } else {
                    req.decodedToken = decodedToken
                    next()
                }
            })
        } else {
            res.status(400).json({message: "No credentials provided"})
        }
        // try {
        //     if(!req.session || !req.session.user) {
        //         return res.status(401).json({message: "Invalid credentials"})
        //     }
        //     next()
        // } catch(err){
        //     next(err)
        // }
    }
}