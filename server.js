const express = require("express");
const passport = require("passport");
const flash = require("express-flash");
const session = require("express-session");
require("dotenv").config();
const app = express();
const PORT = 8080;


// iMPORT INITIALIZEpASSPORT FUNCTION
const initializePassport = require("./passport/passportConfig");
initializePassport(passport);


// Parses details from a form
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");


app.use(
  session({
    // Key we want to keep secret which will encrypt all of our information
    secret: process.env.SESSION_SECRET,
    // Should we resave our session variables if nothing has changes which we dont
    resave: false,
    // Add cookie with maxAge to store the current session.
    cookie: {maxAge: 10000000},
    // Save empty value if there is no vaue which we do not want to do
    saveUninitialized: false
  })
);



//  INITIALIZE PASSPORT FOR AUTHENTICATION
//  Funtion inside passport which initializes passport
app.use(passport.initialize());
// Store our variables to be persisted across the whole session. Works with app.use(Session) above
app.use(passport.session());
app.use(flash());
// //////////////////////////////////////////////////////////////////



app.get("/", (req, res) => {
  res.render("index");
});


// Import users routes
require('./routes/users').initUserRoutes(passport);
let router =  require('./routes/users').usersRoutes
app.use('/', router);
////////////////////////////////////////////////////


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
