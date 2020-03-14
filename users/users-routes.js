const router = require("express").Router()
const Users = require('./users-model')
const restrict = require('../middleware/restrict')

// after '/users'
router.get('/', restrict(), async (req, res, next) => {
    try {
        const users = await Users.findAll()
        res.json(users)
    } catch(err){
        next(err)
    }
})

module.exports = router