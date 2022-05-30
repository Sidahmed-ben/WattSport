
const { pool } = require("../dbConfig");
const bcrypt = require("bcrypt");
var express = require('express');
const  router = express.Router();



module.exports.initUserRoutes = (passport) => {
    router.get("/users/register", checkAuthenticated, (req, res) => {
        res.render("register.ejs");
      });
      
      router.get("/users/login", checkAuthenticated, (req, res) => {
        // flash sets a messages variable. passport sets the error message
        // console.log(req.session.flash.error);
        res.render("login.ejs");
      });
      
      router.get("/users/dashboard", checkNotAuthenticated, (req, res) => {
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
      
      
      router.post('/users/register' , async (req,res) => {
        let { name, email, password, password2} = req.body;
        // let name = "sidou";
        // let email = "email@gmail.com";
        // let password = "password";
        // let password2 = "password";
      
        console.log(
            {
                name,
                email,
                password,
                password2           
            }
        );
      
        let errors = [];
        if(!name || !email || !password || !password2){
            errors.push({message: "Please enter all fields" });
        }
      
        if(password.length < 6 ){
            errors.push({message: "Password should be at least 6 caracters "});
        }
       
        if(password != password2){
            errors.push({message: "Passwords not identique"});
        }
      
        if(errors.length != 0){
            res.render("register", {errors});
        }
      
        //  THE FORM IS VALIDE 
        let salt           = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        console.log(hashedPassword);
        console.log("I AM HERE ");
      
        pool.query(
            'SELECT * FROM users WHERE email = $1', 
            [email] , 
            (err,result) => {
                if(err){
                    console.log(" ERROR IN SELECTING USER WITH EMAIL ",email);
                    throw err
                }
                const match_email_list = result.rows
                if(match_email_list.length != 0){
                    errors.push({message: `Email ${email} exists`});
                    res.render("register" , {errors});
                }else{
                    pool.query(
                        `INSERT INTO users (name, email, password)
                        VALUES ($1, $2, $3)`,[name,email,hashedPassword],
                        (err,result) => {
                            if(err)  {
                                errors.push({message: ` ERROR IN INSERTING USER ${name}`});
                                console.log(` ERROR IN INSERTING USER ${name}`);
                                res.render("register", {errors});
                                throw err
                            }
                            // console.log(result.rows);
                            req.flash(" success_message ", "You are now registered please log in");
                            res.redirect("/users/login");    
                        }
                    )
                }
            }
        )
      });
      
      
      router.post(
        "/users/login",
        passport.authenticate("local", {
          successRedirect: "/users/dashboard",
          failureRedirect: "/users/login",
          failureFlash: true
        })
    );
    
    
    
    function checkAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return res.redirect("/users/dashboard");
        }
        next();
      }
      
      function checkNotAuthenticated(req, res, next) {
        if (req.isAuthenticated()) {
          return next();
        }
        res.redirect("/users/login");
    }

}




module.exports.usersRoutes = router