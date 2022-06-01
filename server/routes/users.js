var express = require('express');
const  router = express.Router();
const utils = require("./utils");

let createUser = require('../controllers/userController').createUser;


module.exports.initUserRoutes = (passport) => {
      router.get("/users/register", utils.checkAuthenticated, (req, res) => {
        res.render("register.ejs");
      });
      
      router.get("/users/login", utils.checkAuthenticated, (req, res) => {
        // flash sets a messages variable. passport sets the error message
        console.log(" I'm in login");
        res.render("login.ejs");
      });
      
      router.get("/users/dashboard", utils.checkNotAuthenticated, (req, res) => {
        console.log(req.isAuthenticated());
        res.render("dashboard", { user: req.user.name });
      });
      
      
      router.get('/users/logout', function(req, res) {
        req.logout(function(err) {
          if (err) { 
            console.log(" ERROR IN LOGOUT ");
            throw err;
          }
          res.redirect('/users/login');
        });
      });   
      
      
      router.post('/users/register' , createUser);
      
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
                      res.status(200).send(user);
                  })
              }    
          })(req, res, next);
      }
    );
    
    
}




module.exports.usersRoutes = router