function checkAuthenticated(req, res, next) {
    // if (req.isAuthenticated()) {
    res.status(200).send( { message: " User authentication is confirmed from server"});
    // }else{
    //   res.status(401).send( { message: " User not authorized from server"});
    // }
  }
  
  function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    
    res.redirect("/users/login");
}


module.exports.checkAuthenticated = checkAuthenticated;
module.exports.checkNotAuthenticated = checkNotAuthenticated;