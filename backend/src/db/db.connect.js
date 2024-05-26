const { Client } = require('pg');
const client = new Client({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

async function connectdb() {
    try {
        await client.connect();
        console.log('Connected to PostgreSQL database!');
        const query = {
            text: 'SELECT * FROM users'
        }
        const result = await client.query(query);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}
connectdb();
module.exports = client;