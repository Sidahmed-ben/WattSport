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
        // console.log(req.session.flash.error);
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
        passport.authenticate("local", {
          successRedirect: "/users/dashboard",
          failureRedirect: "/users/login",
          failureFlash: true
        })
    );
    
    
}




module.exports.usersRoutes = router