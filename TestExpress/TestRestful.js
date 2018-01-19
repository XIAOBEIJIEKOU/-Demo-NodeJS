var express = require('express');
var app = express();
var fs = require("fs");

app.get('/listUsers', function (req, res) {
   fs.readFile( __dirname + "/resource/" + "user.json", 'utf8', function (err, data) {
       console.log( data );
       res.end( data );
   });
})

//添加的新用户数据
var user = {
   "user4" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   },
   "user5" : {
      "name" : "mohit",
      "password" : "password4",
      "profession" : "teacher",
      "id": 4
   }
}

app.get('/addUser',function(req,res){
	fs.readFile( __dirname + "/resource/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse(data);
       data["user4"] = user["user4"];
       console.log( data );
       res.end( JSON.stringify(data) );
   });
})

app.get('/showUser/:id/:id2',function(req,res){
	fs.readFile( __dirname + "/resource/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse(data);
       var user = data["user"+req.params.id2];
       data["user4"] = user["user4"];
       console.log( user );
       res.end( JSON.stringify(user) );
   });
})

app.get('/delete/:id',function(req,res){
	fs.readFile( __dirname + "/resource/" + "user.json", 'utf8', function (err, data) {
       data = JSON.parse(data);

       var user = data["user"+1];
       // delete user;

       delete data["user"+1];
       res.end("delete succuss!");
   });
})

var server = app.listen(9999, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("应用实例，访问地址为 http://%s:%s", host, port)
})