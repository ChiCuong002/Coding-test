'use strict'
const client = require('../db/db.connect');
class AccessServices {
    login = async({email, password}) => {
        const query = {
            text: 'SELECT * FROM users WHERE email = $1',
            values: [email]
        }
        try {
            const result = await client.query(query);
            if (result.rows.length === 0) {
                return { status: 404, message: 'User not found' };
            }
            const user = result.rows[0];
            if (user.password !== password) {
                return { status: 401, message: 'Invalid password' };
            }
            return { status: 200, message: 'Login successful', data: user };
        } catch (err) {
            console.error('Error executing query:', err);
            return { status: 500, message: 'Internal server error' };
        }
    }
}
module.exports = new AccessServices();