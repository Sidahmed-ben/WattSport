const { pool } = require("../db/dbConfig");
const bcrypt = require("bcrypt");


// Called whaen Post Register User is triggered
createUser = async (req,res) =>{
    let { name, email, password, password2} = req.body;
    console.log(req.body);

    console.log(
        {
            name,
            email,
            password,
            password2           
        }
    );
  

    if(!name || !email || !password || !password2){
      res.status(400).send({message : `INPUT ERROR : EMPTY INPUT NAME OR EMAIL OR PASSWORD OR PASSWORD2`})
    }
    
    if(password.length < 6 ){
      res.status(400).send({message : `INPUT ERROR : PASSWORD LENGTH IS LESS THEN 6 CHAR`})
    }
   
    if(password != password2){
      res.status(400).send({message : `INPUT ERROR : PASSWORD IS DIFFERENT OF CONFIRM PASSWORD `})
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
                // Error when sending db request
                res.status(500).send({message : `ERROR IN SELECTING USER WITH EMAIL ${email}`})
                // console.log();
                // throw err
            }
            const match_email_list = result.rows
            if(match_email_list.length != 0){
                // errors.push();
                res.status(409).send({message: `Email ${email} already exists`});
                // res.render("register" , {errors});
            }else{
                pool.query(
                    `INSERT INTO users (name, email, password)
                    VALUES ($1, $2, $3)`,[name,email,hashedPassword],
                    (err,result) => {
                        if(err)  {
                            res.status(500).send({message: ` ERROR IN INSERTING USER ${name}`});
                            // errors.push({message: ` ERROR IN INSERTING USER ${name}`});

                            // console.log(` ERROR IN INSERTING USER ${name}`);
                            // res.render("register", {errors});
                            // throw err
                        }
                        // console.log(result.rows);
                        // req.flash(" success_message ", "You are now registered please log in");
                        // res.redirect("/users/login");    

                        res.status(200).send({message: ` ${name} Registered successfully`});
                    }
                )
            }
        }
    )
}


// Called by passport when login Post is triggered
authenticateUser = (email, password, done) => {
    console.log(email, password);
    pool.query(
      `SELECT * FROM users WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          throw err;
        }
        console.log(results.rows);

        if (results.rows.length > 0) {
          const user = results.rows[0];

          bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
              console.log(err);
            }
            if (isMatch) {
              return done(null, user);
            } else {
              //password is incorrect
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          // No user
          return done(null, false, {
            message: "No user with that email address"
          });
        }
      }
    );
};


module.exports.createUser = createUser;
module.exports.authenticateUser = authenticateUser;
