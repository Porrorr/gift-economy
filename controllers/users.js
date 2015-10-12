var sessions = require('../middleware/sessions');

var usersController = {
  getLogin(req, res) {
    res.render('login', {title: 'Login'});
  },
  login(req, res) {
    res.redirect(req.session.returnTo || '/gifts');
  },
  logout(req, res) {
    req.logout();
    res.redirect('/');
  },
  getSignup(req, res) {
    res.render('signup', {title: 'Become part of the Gift Economy'});
  },
  addNew(req, res) {
    var errors = [];
    //TODO Add check for existing username
    if ( !req.body.password ) {
      errors.push('password');
    }
    if ( !(req.body.password === req.body.passwordConfirm)) {
      errors.push('passwordConfirm');
    }
    if (errors.length !== 0) {
      req.session.signupErrors = errors;
      res.redirect('/user/signup');
    } else {
      sessions.newUser(req.body, () => res.redirect('/gifts'));
    }
  }
}

module.exports = usersController;
