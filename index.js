var express = require("express");
var myParser = require("body-parser");
const util = require('util');
var multer = require('multer');
var upload = multer();
var app = express();
var port= 3000;
var mymessages=require('./messages.js')
app.use(express.static(__dirname+"/views"));
//var mongoose = require('mongoose');
//var dbUrl = 'mongodb://localhost:27017/learning-node'
//const log4js = require('log4js');
   // log4js.configure( { appenders: { file: { type: 'file', filename: 'sendgridd.log', maxLogSize: 10 * 1024 * 1024,  numBackups: 5, compress: true, encoding: 'utf-8', mode: 0o0640, flags: 'w+' }, dateFile: { type: 'dateFile', filename: 'more-important-things.log', pattern: 'yyyy-MM-dd-hh', compress: true }, out: { type: 'stdout' } }, categories: { default: { appenders: ['file', 'dateFile', 'out'], level: 'trace' } } } ); 
   // const logger = log4js.getLogger('things')
app.use(myParser.json()); 
  app.use(myParser.urlencoded({extended : true}));
  // for parsing multipart/form-data
app.use(upload.array()); 
app.get('/', (req, res) => {res.send('Hello World!')
  console.log('started');})
  app.get('/registeruser',function(req,res)
{
  res.redirect(301,'/inbox');
})
app.get('/inbox',(req,res)=>{
  res.render('inbox.ejs',{ messages:mymessages.messages });
  //res.sendStatus(200);
})
  app.post("/registeruser", function(request, response) {
   // let email=JSON.stringify(request.body.to+request.body.subject+request.body.from+request.body.text+request.body.html+request.body.attachments);
      // saveRegistrationData(request); //This is what happens when a POST request is sent to request.body.from+request.body.text /registeruser
    let email=JSON.stringify(request.body,null,4) ; 
  console.log(JSON.stringify(request.body, null, 4));
  //logger.info(JSON.stringify(request.body, null, 4));
  mymessages.messages.push(email);
//response.send("updated");
response.sendStatus(200);
});
  //app.get('/register',(req,res) =>res.send(JSON.stringify(req.body.from+req.body.text, null, 4)))
app.listen(port);
