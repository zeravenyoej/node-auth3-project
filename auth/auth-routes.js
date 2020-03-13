const router = require("express").Router()
const User = require('../users/users-model')


//all routes follow /auth/
router.get('/register', (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})


router.get('/login', (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})


router.get('/logout', (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})


module.exports = router