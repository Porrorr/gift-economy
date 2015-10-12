var sessions = require('client-sessions');
var passport = require('passport');
var Strategy = require('passport-local').Strategy;
var mongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId;
var ensureLogin = require('connect-ensure-login');

var store;

var mongoUrl = 'mongodb://localhost:27017/gift-economy';

mongoClient.connect(mongoUrl, (err, db) => {
  if (err) {
    throw new Error('Unable to connect to MongoDB, exiting\n' + err);
  }
  store = db.collection('users');
  process.on('exit', () => db.close());
});

// Configure the local strategy for use by Passport.
//
// The local strategy require a `verify` function which receives the credentials
// (`username` and `password`) submitted by the user.  The function must verify
// that the password is correct and then invoke `cb` with a user object, which
// will be set at `req.user` in route handlers after authentication.
passport.use(new Strategy(
  function(username, password, cb) {
    store.findOne({ username: username }, (err, user) => {
    // db.users.findByUsername(username, function(err, user) {
      if (err) { return cb(err); }
      if (!user) { return cb(null, false); }
      // TODO Use proper password authentication
      if (user.password != password) { return cb(null, false); }
      delete user.password;
      return cb(null, user);
    });
  }));


// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
  delete user.password;
  cb(null, user);
});

passport.deserializeUser(function(user, cb) {
  cb(null, user);
});

module.exports = {
  setMiddleware: app => {
    app.use(sessions({
      cookieName: 'session',
      secret: 'GastropubsquidkeffiyehstreetartPBRtousleddisruptroofpartytwitter',
      duration: 3 * 24 * 60 * 60 * 1000,
      activeDuration: 24 * 60 * 60 * 1000
    }));
    // Initialize Passport and restore authentication state, if any, from the
    // session.
    app.use(passport.initialize());
    app.use(passport.session());
  },
  authenticate: (options) => {
    options = options || {};
    options.failureRedirect = options.failureRedirect || '/login';
    return passport.authenticate('local', options);
  },
  ensureLoggedIn: options => ensureLogin.ensureLoggedIn(options)
}