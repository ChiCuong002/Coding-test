'use strict'
const jwt = require('jsonwebtoken');
const EMAIL_REGEX = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;

const AccessServices = require('../services/access.services');

class AccessController {
    login = async (req, res, next) => {
        console.log(req.body);

        const { email, password } = req.body;

        if (!EMAIL_REGEX.test(email)) {
            return res.status(400).json({ message: 'Invalid email format.' });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long.' });
        }
        const result = await AccessServices.login(req.body);
        const { status, message, data } = result;
        if (status === 200) {
            const token = jwt.sign({ id: data.id }, process.env.JWT_SECRET, { expiresIn: '12h' });
            return res.status(status).json({ message: message, token: token });
        }
        return res.status(status).json({ message: message });
    }
}
module.exports = new AccessController();    