var fs = require("fs");
var express = require("express");
var app = express();
// 添加public文件夹做静态资源文件夹，用于请求静态资源
//	http://127.0.0.1:3009/images/damon.jpg
app.use(express.static("public"));
/*
POST 需要的依赖
*/
var bodyParser = require('body-parser');
// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({ extended: false })
/*
文件上传需要的依赖
*/
var multer  = require('multer');
app.use(multer({ dest: '/tmp/'}).array('image'));
/*
cookie 需要的依赖
*/
var cookieParser = require('cookie-parser')
app.use(cookieParser())

var server = app.listen(8888,function(){
	var host = server.address().address;
	var port = server.address().port;

	console.log("访问地址：http://%s:%s",host,port);
});

app.get("/index.html",function(req,res){
	res.sendFile(__dirname + "/index.html");
})

app.get("/testGet",function(req,res){
	res.send("HELLO WORLD !");
})

app.post("/testForm",urlencodedParser,function(req,res){
	//	处理表单字段
	var nameJson = {
		"firstName" : req.body.first_name
	}
	console.log(nameJson);
	//	处理表单上传图片
	console.log(req.files[0]);  // 上传的文件信息

	var dest_file = __dirname + "/public/images/" + req.files[0].originalname;
	fs.readFile(req.files[0].path, function(err,data){
		fs.writeFile(dest_file, data, function(err){
			if (err) {
				console.log(err);
			}else{
				var image = {
					message : "Image succss !",
					file : dest_file
				}
			}
			console.log(image);
			res.end( JSON.stringify( image ) );
		});
	});
})

app.get('/cookie', function(req, res) {
  console.log("Cookies: ", req.cookies);
  res.end( JSON.stringify( req.cookies ) );
})
