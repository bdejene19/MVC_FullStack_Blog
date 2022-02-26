// import necessary server components 
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path')
const sequelize = require('./config/connection');

// initialize server, handlebars and port number
const PORT = process.env.PORT || 8000;
const hbs = exphbs.create({});
const app = express();

// initialize handlebars as our view engine through express middleware 
app.engine('handlebars', hbs.engine)
app.set('view engine')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')))

sequelize.sync({force: false}).then(() => {
    app.listen(PORT, () => {
        console.log(`server running on http://localhost:${PORT}`)
    })
})
