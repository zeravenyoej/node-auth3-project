const express = require('express')
const helmet = require('helmet')
const cookieParser = require("cookie-parser")
const authRoutes = require('./auth/auth-routes')
const usersRoutes = require('./users/users-routes')
const restrict = require('./middleware/restrict')
const checkDep = require('./middleware/checkDep')

const server = express()
const PORT = 5000

server.use(helmet())
server.use(express.json())
server.use(cookieParser())

server.use('/auth', authRoutes)
// restrict means idk who you are 401, checkDep means I know who you are, but you're not authorized to be here 403
server.use('/users', restrict(), checkDep("student"), usersRoutes)


server.use('/', (err, req, res, next) => {
    console.log("ERROR: ", err)
    res.status(500).json("Something went wrong")
})

server.listen(PORT, console.log(`Server is now running on port ${PORT}`))