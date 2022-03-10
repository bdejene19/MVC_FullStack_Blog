// import necessary server components
const path = require("path");
const sequelize = require("./config/connection");
const session = require("express-session");

const exphbs = require("express-handlebars");
const hbs = exphbs.create({});

const route = require("./controllers/index");
const express = require("express");
const app = express();

// initialize server, handlebars and port number
const PORT = process.env.PORT || 8000;

const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sess = {
  secret: "my secret",
  cookie: {
    maxAge: 9000000,
    httpOnly: true,
    secure: false,
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

// // initialize handlebars as our view engine through express middleware
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(route);

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`);
  });
});
