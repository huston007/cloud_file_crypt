
/**
 * Module dependencies.
 */
var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , files = require('./routes/files')
  , login = require('./routes/login')
  , http = require('http')
  , path = require('path')
  ,  passport = require('passport')
    , db = require('./db/db.js')
    , GoogleStrategy = require('passport-google').Strategy
    , SessionStore = require("session-mongoose")(express);

var app = express();

// all environments
app.set('port', process.env.PORT || 8080);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico'));
app.use(express.logger('dev'));
app.use(express.cookieParser());
//app.use(express.bodyParser({uploadDir:'./upload'}));
app.use(express.bodyParser());

//app.use(express.session({ secret: 'keyboard cat' }));
var store = new SessionStore({
    url: db.getMongoUrl(),
    interval: 120000
})
// configure session provider
app.use(express.session({
    secret: 'the secret world for session',
    store: store,
    cookie: { maxAge: 90000000 }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
//if ('development' == app.get('env')) {
  app.use(express.errorHandler());
//}

//routes
app.get('/', routes.index);
app.get('/login', login.login);

app.get('/auth/google', passport.authenticate('google'));
app.get('/auth/google/return', passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }));

app.post('/list-files', files.list);
app.post('/list-incoming-files', files.incominglist);
app.post('/uploadfile', files.uploadfile);
app.get('/downloadfile', files.downloadfile);
app.get('/removefile', files.removefile);
app.get('/issecretok', files.issecretok);
app.post("/sendfile", files.sendfile)

//passport init
passport.serializeUser(function(user, done) { done(null, user); });
passport.deserializeUser(function(user, done) { done(null, user);});
passport.use( user.getGoogleStrategy(GoogleStrategy) );


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
