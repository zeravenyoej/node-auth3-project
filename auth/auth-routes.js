const router = require("express").Router()
const User = require('../users/users-model')
const validateUser = require('../middleware/validateUser')
const restrict = require('../middleware/restrict')
const bcrypt = require("bcryptjs")


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
        res.status(201).json(newUser)
    } catch(err){
        next(err)
    }
})


router.post('/login', validateUser(), async (req, res, next) => {
    try {
        const { username, password } = req.body
        //now that we've established that the username is real, check the password
        const isPasswordValid = bcrypt.compare(password, req.user.password)
        if(!isPasswordValid){
            res.status(400).json({ message: "Please enter a valid password"})
        }

        req.session.user = req.user
        res.json({message: `Welcome ${username}`})
    } catch(err){
        next(err)
    }
})


router.get('/logout', restrict(), async (req, res, next) => {
    try {
        req.session.destroy((err) => {
            if(err){
                next(err)
            } else {
                res.json({message: "Successfully logged out"})
            }
        })
    } catch(err){
        next(err)
    }
})


module.exports = router