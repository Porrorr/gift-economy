var usersController = {
  getLogin(req, res) {
    res.render('login', {title: 'Login'});
  },
  login(req, res) {
    res.redirect(req.session.returnTo || '/gifts');
  }
}

module.exports = usersController;
