require('dotenv').config()
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const authenticateToken = require('./auth/authentication');


app.use(express.json());
app.use(bodyParser.json())
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}));


const AccessController = require('./controllers/access.controller');    
app.post('/login', async(req, res) => {
    console.log('Login request received');
    await AccessController.login(req, res); 
});

app.get('/profile', authenticateToken, async (req, res) => {
    return res.status(200).json({ message: "profile page" });
});

module.exports = app;