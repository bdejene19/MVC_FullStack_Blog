const home = require('express').Router();

home.get('/', (req, res) => {
    res.render('homepage', [{title: 'hello world', text: 'first post'}]);
})

home.get('/login', (req, res) => {
    res.render('test')
})

module.exports = home;