const db = require('../data/config')
const bcrypt = require("bcryptjs")

module.exports = {
    findAll,
    findByFilter,
    findById,
    createUser
}

function findAll(){
    return db("users").select("id", "username")
}

function findByFilter(filter){
    return db("users")
        .select("id", "username", "password")
        .where(filter)
}

function findById(id){
    return db("users")
        .select("id", "username")
        .where({ id })
        .first()
}

async function createUser(credentials){
    credentials.password = await bcrypt.hash(credentials.password, 12)
    const [id] = await db("users").insert(credentials)
    return findById(id)
}