const router = require("express").Router()
const User = require('../users/users-model')
const validateUser = require('../middleware/validateUser')
const restrict = require('../middleware/restrict')


//all routes follow /auth/
router.post('/register', (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})


router.post('/login', validateUser(), (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})


router.get('/logout', restrict(), (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})


module.exports = router