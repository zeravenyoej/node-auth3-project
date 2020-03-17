const router = require("express").Router()
const User = require('../users/users-model')
const validateUser = require('../middleware/validateUser')
const restrict = require('../middleware/restrict')
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


//Do I not need this in the register route? Jason doesn't have it on the most recent guided lecture
function generateToken(user){
    const payload = {
        username: user.username,
        department: user.department
    }
    const secret = process.env.JWT_SECRET;

    const options = {
        expiresIn: '1hr'
    }
    return jwt.sign(payload, secret, options)
};

//all routes follow /auth/
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, department } = req.body

        const user = await User.findByFilter({ username }).first()
        if(user){
            return res.status(400).json({message: "Username already taken"})
        }

        if (!password || !department){
            return res.status(400).json({message: "Please provide a password and department"})
        }

        const newUser = await User.createUser(req.body)
        const token = generateToken(newUser)
        res.status(201).json({
            message: `Welcome ${username}`,
            authToken: token
        })
    } catch(err){
        next(err)
    }
})


router.post('/login', validateUser(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        const isPasswordValid = bcrypt.compare(password, req.user.password)

        if(!isPasswordValid){
            res.status(400).json({ message: "Please enter a valid password" })
        } else {
            const token = generateToken(req.user)
            res.cookie("authToken", token)
            res.json({ message: `Welcome ${username}` })
        }
    } catch(err){
        next(err)
    }
})

module.exports = router