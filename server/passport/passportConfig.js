const LocalStrategy = require("passport-local").Strategy;
const { pool } = require("../db/dbConfig");


const userController = require('../controllers/userController');

function initialize(passport) {
  console.log("Initialized");
  const authenticateUser =  userController.authenticateUser;

  // Initialize authentication strategy
  passport.use(
    new LocalStrategy(
      { usernameField: "email", passwordField: "password" , passReqToCallback : true},
      authenticateUser
    )
  );
  
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  //   the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => 
    {
      console.log(user)
      let serializeInfo = {id: user.id, type: user.type}
      done(null, serializeInfo, user.user)
    }
    );

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user

  passport.deserializeUser((req,serializeInfo, done) => {
    console.log("////////////////// ",serializeInfo);
    let table;
    switch (serializeInfo.type){
      case 'isCoach' :
        table = "coach"
        break;
      case 'isEntrain':
        table = "entrain"
        break;
      default:
        return done(null,false);
    }

    pool.query(`SELECT * FROM ${table} WHERE id = $1`, [serializeInfo.id], (err, results) => {
      if (err) {
        return done(err);
      }
      console.log(`ID is ${results.rows[0].id}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
