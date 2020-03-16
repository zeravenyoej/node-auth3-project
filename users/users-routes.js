const router = require("express").Router()
const Users = require('./users-model')


// after '/users'
router.get('/', async (req, res, next) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch(err){
        next(err)
    }
})

module.exports = router