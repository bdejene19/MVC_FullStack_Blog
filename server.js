// import necessary server components 
const express = require('express');
const path = require('path')
const sequelize = require('./config/connection');
const exhbs = require('express-handlebars');
const app = express();
const hbs = exhbs.create({});


// initialize server, handlebars and port number
const PORT = process.env.PORT || 8000;
// // initialize handlebars as our view engine through express middleware 
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('checkout')
})
sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})
