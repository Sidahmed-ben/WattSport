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
  console.log("////////////////////:",req.params)
  /** Get date as varchar to ignore timzone problems */
  pool.query(
    `SELECT session_date::varchar,title,session_id FROM session WHERE session_type_id = $1 ORDER BY session_date ASC `, 
    [req.params.session_type] , 
    (err,result) => {
        if(err){
            // Error when sending db request
            console.log(err)
            return res.status(500).send({message : `ERROR IN FETCHING COACH SESSION LIST `})
        }
        const sessionCoachList = result.rows
        return res.status(200).send(sessionCoachList);
        }
  )
  
}

deleteCoachSessionId = (req ,res ) => {
  console.log(req.body);
  let deletedSessionId = req.body.deletedSessionId;
  pool.query(
    `DELETE FROM session WHERE session_id  = $1 RETURNING *`, 
    [deletedSessionId] , 
    (err,result) => {
      if(err){
        // Error when sending db request
        return res.status(500).send({message : `ERROR IN DELETING SESSION WITH ID ${deletedSessionId} RETURNING *`})
      }

      if(result.rows.length == 0){
        return res.status(500).send({message : ` SESSION WITH ID ${deletedSessionId} NOT FOUND `})
      }
      const deletedSession = result.rows[0];
      return res.status(200).send({message : ` SESSION ${deletedSession.session_id} DELETED SUCCEFFULLY `});
    }
  )
}


addCoachSession = (req ,res ) => {
  console.log(req.body);

  let addedSession = req.body;
  let dateTime = addedSession.date + " " + addedSession.time;
  // console.log("dateTime =",dateTime);
  // console.log(`INSERT INTO session (title, session_date) VALUES('${addedSession.title}','${dateTime}') `)
  pool.query(
    `INSERT INTO session (title,session_type_id, session_date) VALUES('${addedSession.title}','${addedSession.session_type}','${dateTime}') RETURNING *`,  
    (err,result) => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        if(err.code === '23505'){
          return res.status(409).send({message : ` SESSION WITH THE SAME DATE ALLREADY EXISTS `})
        }else{
          return res.status(500).send({message : `ERROR IN ADDING NEW SESSION`})
        }
      }
      const addedSession = result.rows[0];
      console.log(addedSession)
      return res.status(200).send({message : ` SESSION ADDED SUCCESSFFULY WITH ID `, session_id:addedSession.session_id});
    }
  )
}


editCoachSession = (req ,res ) => {
  let editedSession = req.body;
  console.log(editedSession);
  let dateTime = editedSession.date + " " + editedSession.time;

  pool.query(
    `UPDATE session SET title = $1, session_date = $2  WHERE session_id = $3`,
    [editedSession.title,dateTime,editedSession.id],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        if(err.code === '23505'){
          return res.status(409).send({message : ` SESSION WITH THE SAME DATE ALLREADY EXISTS `})
        }else{
          return res.status(500).send({message : `ERROR IN EDITING SESSION`})
        }
      }
      const addedSession = result.rows[0];
      console.log(addedSession)
      return res.status(200).send({message : ` SESSION UPDATED SUCCESSFFULY `});
    }
  )
}

registerUserInSession = (req,res) => {
  let registeredSession = req.body;
  console.log(" User session data => ", req.user);
  if(req.isAuthenticated()){
    console.log("AUTHENTICATED")
  }
  pool.query(
    `INSERT INTO entrain_session (session_id, entrain_id) VALUES($1,$2)`,
    [registeredSession.id, req.user.entrain_id],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        if(err.code === '23505'){
          return res.status(409).send({message : `USER ALREADY REGISTERED IN THIS SESSION`})
        }else{
          return res.status(500).send({message : `ERROR ON REGISTERING USER IN THE SESSION`})
        }
      }
      return res.status(200).send({message : ` USER REGISTERED IN SESSION SEUCCESSFFULY `});
    }
  )
} 


getUserValidSessionList = (req,res) => {
  console.log(" User session data => ", req.user);
  if(req.isAuthenticated()){
    console.log("AUTHENTICATED")
  }
  pool.query(
    `SELECT entrain_session.validated, session.session_id, session.title, session.session_date::varchar FROM  entrain_session INNER JOIN session ON entrain_session.session_id = session.session_id WHERE entrain_session.entrain_id = $1 ORDER BY session.session_date`,
    [req.user.entrain_id],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        return res.status(500).send({message : `ERROR ON GETTING USER VALID SESSIONS`})
      }
      const validSessionList = result.rows
      return res.status(200).send(validSessionList);
    }
  )
} 



getUsersByLesson = (req,res) => {
  let sessionId = req.body.id;
  console.log(" The id of the selected session => ", sessionId);
  if(req.isAuthenticated()){
    console.log("AUTHENTICATED")
  }

  pool.query(
    'SELECT entrain.entrain_id,entrain.name, entrain.email, entrain_session.validated FROM entrain_session JOIN entrain ON entrain_session.entrain_id = entrain.entrain_id WHERE session_id = $1',
    [sessionId],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        return res.status(500).send({message : `ERROR ON GETTING USERS BY LESSON`})
      }
      const users = result.rows
      return res.status(200).send(users);
    }
  )
} 

validateUserSession = (req,res) => {
  
  console.log(" The user and the sesion Id => ", req.body);
  let userId = req.body.userId;
  let sessionId = req.body.sessionId;

  if(req.isAuthenticated()){
    console.log("AUTHENTICATED")
  }
  
  pool.query(
    `UPDATE entrain_session SET validated = 't' WHERE session_id = $1 AND entrain_id = $2`,
    [sessionId, userId],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        return res.status(500).send({message : `ERROR ON VALIDATING USER'S SESSION BY THE COACH`});
      }
      return res.status(200).send({message : `USER VALIDATED SUCCEFFULLY`});
    }
  )
}  

invalidateUserSession = (req,res) => {
  
  console.log(" The user and the sesion Id => ", req.body);
  let userId = req.body.userId;
  let sessionId = req.body.sessionId;

  if(req.isAuthenticated()){
    console.log("AUTHENTICATED")
  }

  
  pool.query(
    `DELETE FROM entrain_session WHERE entrain_id = $1 AND session_id = $2`,
    [userId,sessionId],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        return res.status(500).send({message : `ERROR ON INVALIDATING USER'S SESSION BY THE COACH`});
      }
      return res.status(200).send({message : `USER INVALIDATED SUCCEFFULLY`});
    }
  )
}  

getSessionsTypes = (req,res) => {
  pool.query(
    `SELECT * FROM session_type`,
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        return res.status(500).send({message : `ERROR ON GETTING SESSION'S TYPES`});
      }else{
        const sessionsTypes = result.rows
        return res.status(200).send(sessionsTypes);
      }
    }
  )
}

getCoachSessionTitles = (req,res) => {
  console.log(" Type session Id => ", req.params.session_type);

  pool.query(
    `SELECT name FROM session_type WHERE id = $1 ;`,
    [req.params.session_type],
    (err,result)  => {
      if(err){
        // Error when sending db request
        console.log(err.code);
        console.log(err);
        return res.status(500).send({message : `ERROR ON GETTING SESSION'S TITLES`});
      }else{
        const sessionsTitle = result.rows
        console.log(sessionsTitle)
        return res.status(200).send(sessionsTitle);
      }
    }
  )
}


module.exports.invalidateUserSession = invalidateUserSession ;
module.exports.validateUserSession = validateUserSession; 
module.exports.createUser = createUser;
module.exports.getCoachSessionList = getCoachSessionList;
module.exports.deleteCoachSessionId = deleteCoachSessionId;
module.exports.authenticateUser = authenticateUser;
module.exports.addCoachSession = addCoachSession;
module.exports.editCoachSession = editCoachSession;
module.exports.registerUserInSession = registerUserInSession;
module.exports.getUserValidSessionList = getUserValidSessionList;
module.exports.getUsersByLesson = getUsersByLesson;
module.exports.getSessionsTypes = getSessionsTypes;
module.exports.getCoachSessionTitles = getCoachSessionTitles;





