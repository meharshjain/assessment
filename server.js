var express = require("express"),
  mongoose = require("mongoose"),
  app = express(),
  port = process.env.PORT || 5000,
  methodOverride = require("method-override"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  User = require("./server/user"),
  session = require("express-session"),
  MongoStore = require("connect-mongodb-session")(session),
  bodyParser = require("body-parser");
app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({ extended: false }));
//require("dotenv").config({ path: "./.env" });

if (process.env.NODE.ENV === "production") {
  app.use(express.static("client/build"));
}

//ONLINE MONGODB ATLAS
const DB = "mongodb+srv://admin:admin@cluster0.oun5l.mongodb.net/assessment";
mongoose
  .connect(DB)
  .then(() => {
    console.log("DATABASE CONNECTED to localhost:" + port);
  })
  .catch((err) => console.log("Database Connecting Error"));

//Offline MONGO
/* mongoose
  .connect("mongodb://localhost:27017/assessment")
  .then(() => console.log("success"))
  .catch((err) => console.log(err)); */

//session
var store = new MongoStore({
  uri: "mongodb://localhost:27017/assessment",
  collection: "sessions",
  secret: "secretCode",
});
store.on("error", function (error) {
  console.log(error);
});

app.use(
  session({
    store: store,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
    secret: "secretCode",
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(require("./server/router"));

app.listen(port, function () {
  console.log("Server Is Now Started On Port: " + port);
});
