const home = require('express').Router();

home.get('/', (req, res) => {
    res.render('homepage');
})

home.post('/signup', (req, res) => {
    
})

module.exports = home;