var fs = require("fs");

//	非组赛事
fs.readFile("test.txt", function(err,data){
	if (err) {return console.error(err);};
	console.log(data.toString());
});

console.log("This is the end1");

//	阻塞式（顺序执行？）
var data = fs.readFileSync("test.txt");
console.log(data.toString());
console.log("This is the end2");