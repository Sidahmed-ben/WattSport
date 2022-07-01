const { pool } = require("../db/dbConfig");
const bcrypt = require("bcrypt");


// Called whaen Post Register User is triggered
createUser = async (req,res) =>{
    let { name, email, password, password2, user} = req.body;
    console.log(req.body);

    console.log(
        {
            name,
            email,
            password,
            password2,
            user  
        }
    );
    if(!name || !email || !password || !password2 || !user){
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
    let table;
    switch (user){
      case 'isCoach' :
        table = "coach"
        break;
      case 'isEntrain':
        table = "entrain"  
        break;
      default:
        res.status(500).send({message: ` User Type Undefined `});
    }
    // Enregistrer un sportif
      pool.query(
        `SELECT * FROM ${table} WHERE email = $1`, 
        [email] , 
        (err,result) => {
            if(err){
                // Error when sending db request
                return res.status(500).send({message : `ERROR IN SELECTING USER WITH EMAIL ${email}`})
            }
            const match_email_list = result.rows
            if(match_email_list.length != 0){
                res.status(409).send({message: `Email ${email} already exists`});
            }else{
                pool.query(
                    `INSERT INTO ${table} (name, email, password)
                    VALUES ($1, $2, $3)`,[name,email,hashedPassword],
                    (err,result) => {
                        if(err)  {
                            return res.status(500).send({message: ` ERROR IN INSERTING USER ${name}`});
                        }   
                        return res.status(200).send({message: ` ${name} Registered successfully`});
                    }
                )
            }
          }
        )


}


// the first function Called by passport when login Post is triggered
authenticateUser = (req,email, password, done) => {
    console.log(req.body.user,email, password);
    let table;
    switch (req.body.user){
      case 'isCoach' :
        table = "coach"
        break;
      case 'isEntrain':
        table = "entrain"
        break;
      default:
        return done(null,false);
    }
    pool.query(
      `SELECT * FROM ${table} WHERE email = $1`,
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
              console.log(" User found ");
              user.type = req.body.user;
              // This user will sent to the client.
              return done(null, user);
            } else {
              //password is incorrect
              console.log(" Uncorrect password ");
              return done(null, false, { message: "Password is incorrect" });
            }
          });
        } else {
          // No user
          console.log(" No user found ");
          return done(null, false, {
            message: "No user with that email address"
          });
        }
      }
    );

};


getCoachSessionList = (req ,res ) => {
  /** Get date as varchar to ignore timzone problems */
  pool.query(
    `SELECT session_date::varchar,title,session_id FROM session ORDER BY session_date ASC`, 
    [] , 
    (err,result) => {
        if(err){
            // Error when sending db request
            return res.status(500).send({message : `ERROR IN FETCHING COACH SESSION LIST `})
        }
        const sessionCoachList = result.rows
        return res.status(200).send(sessionCoachList);
        }
    )
  
}

module.exports.createUser = createUser;
module.exports.authenticateUser = authenticateUser;
