function logoutUsr(req, res, next){
    if(req.logout()){
      req.isLogged = undefined
      next()
    };
    res.redirect('/');
 
}

module.exports = logoutUsr
