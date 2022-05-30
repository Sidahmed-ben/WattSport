const { pool } = require("../db/dbConfig");
const bcrypt = require("bcrypt");



createUser = async (req,res) =>{
    let { name, email, password, password2} = req.body;

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
}



module.exports.createUser = createUser;