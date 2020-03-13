const express = require('express')
const helmet = require('helmet')
const authRoutes = require('./auth/auth-routes')

const server = express()
const PORT = 5000

server.use(helmet())
server.use(express.json())
server.use('/auth/', authRoutes)

server.use('/', (err, req, res, next) => {
    console.log()
    res.status(500).json("Something went wrong")
})


server.listen(PORT, console.log(`Server is now running on port ${PORT}`))