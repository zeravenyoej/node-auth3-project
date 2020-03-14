const express = require('express')
const helmet = require('helmet')
const session = require("express-session")
const KnexSessionStore = require("connect-session-knex")(session)
const dbConfig = require('./data/config')

const authRoutes = require('./auth/auth-routes')
const usersRoutes = require('./users/users-routes')

const server = express()
const PORT = 5000

server.use(helmet())
server.use(express.json())
server.use(session({
    name: "token",
    cookie: {
        httpOnly: true,
    },
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET || "secret",
    store: new KnexSessionStore({
        createTable: true,
        knex: dbConfig
    }),
}))

server.use('/auth', authRoutes)
server.use('/users', usersRoutes)

server.use('/', (err, req, res, next) => {
    console.log("ERROR: ", err)
    res.status(500).json("Something went wrong")
})


server.listen(PORT, console.log(`Server is now running on port ${PORT}`))