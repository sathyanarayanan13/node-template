const connection = {
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
}

let db;

if (process.env.DATABASE_URL) {
    const pgp = require('pg-promise')()
    db = pgp(connection)
} else {
    db = null
}

module.exports = db;