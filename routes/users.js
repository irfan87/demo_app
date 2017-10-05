const express = require('express');
const routes = express.Router();

// register route
routes.get('/register', (req, res, next) => {
    res.send('register');
});

// authenticate route
routes.get('/authenticate', (req, res, next) => {
    res.send('authenticate');
});

// profile route
routes.get('/profile', (req, res, next) => {
    res.send('profile');
});

// validate route
routes.get('/validate', (req, res, next) => {
    res.send('validate');
});

module.exports = routes;