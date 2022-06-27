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
  
  //  The second function called after login POST.
  // Stores user details inside session. serializeUser determines which data of the user
  // object should be stored in the session. The result of the serializeUser method is attached
  // to the session as req.session.passport.user = {}. Here for instance, it would be (as we provide
  // the user id as the key) req.session.passport.user = {id: 'xyz'}
  passport.serializeUser((user, done) => 
    {
      console.log("serialize user",user)
      // choose witch id will be used to stock user in session .
      let serializeInfo;
      switch (user.type){
        case 'isCoach' :
          serializeInfo = {id: user.coach_id, type: user.type}
          break;
        case 'isEntrain':
          serializeInfo = {id: user.entrain_id, type: user.type}
          break;
        default:
          return console.log(" SERIALIZING ERROR ");
      }

      done(null, serializeInfo)
    }
    );

  // In deserializeUser that key is matched with the in memory array / database or any data resource.
  // The fetched object is attached to the request object as req.user
  passport.deserializeUser((req,serializeInfo, done) => {
    console.log(" //////////////////// JE SUIS DANS DESERIALIZE ", serializeInfo);
    let table;
    let id_name;
    switch (serializeInfo.type){
      case 'isCoach' :
        table = "coach"
        id_name = "coach_id"
        break;
      case 'isEntrain':
        table = "entrain"
        id_name = "entrain_id"

        break;
      default:
        return done(null,false);
    }

    console.log("////////////////////  fin serilizing")
    pool.query(`SELECT * FROM ${table} WHERE ${id_name} = $1`, [serializeInfo.id], (err, results) => {
      if (err) {
        return done(err);
      }
      // console.log(`ID is ${results.rows[0].entrain_id}`);
      return done(null, results.rows[0]);
    });
  });
}

module.exports = initialize;
