var giftsController = {
  getHome: function(req, res) {
    res.render('gifts', { title: 'Gifts', gift: [
      {name: 'Free thing', description: 'This thing is free'},
      {name: 'Free help', description: 'I\'ll help you all for free'}
    ]});
  }
}

module.exports = giftsController;
