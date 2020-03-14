const router = require("express").Router()
const restrict = require('../middleware/restrict')

// after '/users'
router.get('/', async (req, res, next) => {
    try {

    } catch(err){
        next(err)
    }
})

module.exports = router