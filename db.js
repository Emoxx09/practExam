const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "1234",
    host: "localhost",
    port: 5432,
    database: "practice"
});

module.exports = pool;