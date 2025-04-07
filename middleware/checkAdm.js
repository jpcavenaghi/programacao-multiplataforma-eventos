function checkAdm(req, res, next) {
    if (req.session.login == undefined){
      res.redirect("/usuarios/login");
    } else {
      if(req.session.login.inAdm) {
          next();
      }
      else {
          res.redirect('/');
      }
    }
  }
  
  module.exports = checkAdm;