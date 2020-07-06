var createError = require('http-errors');
var express = require('express');
require('dotenv').config()
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
//const session = require('express-session');
//./bin/www
var signupRouter = require('./routes/signup');
var loginRouter = require('./routes/login');
var forgetRouter = require('./routes/forgetpassword');
var updatepassRouter = require('./routes/updatepassword');
var editprofileRouter = require('./routes/editprofile');

var addmeasurementsRouter =require('./routes/addmeasurements');
var viewprofileRouter =require('./routes/viewprofile');
var recommenderRouter =require('./routes/recommender');
var mapslocationRouter =require('./routes/maplocation');
var testRouter = require('./routes/test');
var orderRouter = require('./routes/order');
var order2Router = require('./routes/order2');
var dashboardRouter = require('./routes/dashboard');
var dashboardRouter2 = require('./routes/dashboard2');
const user = require('./models/user');
const tailor = require('./models/tailor');
const http = require("http")
require('dotenv').config()
//practice


var app = express();
const port = 3000;
const server = http.createServer(app);
const io = require("socket.io")(server);



//Connect MongoDB
// const db = require('./config/keys').mongoURI;
let db=process.env.DBPASSWORD
mongoose.connect(db,{ useNewUrlParser: true }).then(() => console.log('MongoDB Connected')).catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');



//app.use(session({secret:'mysecret',resave:false,saveUninitialized:false}));
//app.use('/uploads',express.static('uploads'));
function access(req,res,next){
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers","Origin,X-Requsted-With,Content-Type","Accept");
  res.setHeader("Access-Control-Allow-Methods","GET,POST,PATCH,DELETE,OPTIONS");
  next();

}

 function userAuth (req,res,next){
  var post_data = req.body;
  var id = post_data.id;
  var utype=post_data.utype;
  console.log(id)
  console.log(utype)

  if (utype=="Customer")
  {
    user.findOne({_id: id}).count(function(err, number){
      if(err)
      {
        console.log(err);
        res.json({'message':'login again'})
        next();
      }
      else if (number == 0)
      {
        res.json({'message':'login again'})
        next();
      }
      else {

        next();
      }

 })
  }
 else if(utype=="Tailor")
  {
    tailor.findOne({_id: id}).count(function(err, number){
      if(err)
      {
        console.log(err);
        res.json({'message':'login again'})
        next();
      }
      else if (number == 0)
      {
        res.json({'message':'login again'})
        next();
      }
      else {
        next();
      }

 })
  }
  else {
    next()
  }
}

app.use(logger('dev'));

app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ limit:'50mb' }));


app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/order',userAuth,orderRouter);
app.use('/order2',userAuth,order2Router);
app.use('/maplocation',userAuth,mapslocationRouter);
app.use('/test',testRouter);
app.use('/signup',signupRouter);
app.use('/login',loginRouter);
app.use('/forgetpassword',forgetRouter);
app.use('/updatepassword',userAuth, updatepassRouter);
app.use('/editprofile',userAuth,editprofileRouter);

app.use('/viewprofile',userAuth,viewprofileRouter);
app.use('/addmeasurements',userAuth,addmeasurementsRouter);
app.use('/recommender',userAuth,recommenderRouter);

app.use('/dashboard',access,dashboardRouter);
app.use('/dashboard2',access,dashboardRouter2);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json({'message':"error"});
  next();
});

const socketOps = require("./socketOps/socketOps.js");
socketOps.allSocketOps(io);

server.listen(port,()=> console.log("server listening"))

module.exports = app;
