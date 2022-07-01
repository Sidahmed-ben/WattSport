var express = require('express');
const  router = express.Router();
const utils = require("./utils");

let createUser = require('../controllers/userController').createUser;


module.exports.initUserRoutes = (passport) => {   

      /** Calls for both Coach and User */
      /** GET calls */
      /** Get user Dashboard */  
      router.get("/users/dashboard", utils.checkAuthenticated);
      router.get('/users/logout', function(req, res) {
        req.logout(function(err) {
          if (err) { 
            res.status(500).send({message: "Error in Logout"});
          }else{
            res.status(200).send({message: "Logout successffuly"}); //info contains the error message
          }
        });
      });   
      /** POST calls */
      /** Post user Registration */  
      router.post('/users/register' , createUser);
      /** Post user Login */  
      router.post(
        "/users/login",
        // FIND SOLUTION HERE FOR RETURNING STATUS ERROR
        (req, res, next) => {
          passport.authenticate('local', function(err, user, info) {
              if (err) { return next(err); } //error exception
              // user will be set to false, if not authenticated
              if (!user) {
                  res.status(401).send({message: "User not found ! Verify your adress or your password"}); //info contains the error message
              } else {
                  // if user authenticated maintain the session
                  req.logIn(user, function() {
                      // do whatever here on successful login
                      console.log( " Test post login ",user)
                      res.status(200).send(user);
                  })
              }    
          })(req, res, next);
      }
    );    
    


    /** Calls for Coach */  
    /** Get call */  
    router.get('/users/coach/seances' , getCoachSessionList);

    


}




module.exports.usersRoutes = router