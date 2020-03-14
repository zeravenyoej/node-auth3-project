
exports.up = async function(knex) {
    await knex.schema
        .createTable("users", table => {
            table.increments("id")
            table.text("username")
                .notNullable()
                .unique()
            table.text("password")
                .notNullable()
            table.text("department")
                .notNullable()
        })
};

exports.down = async function(knex) {
    await knex.schema.dropTableIfExists("users")
};
