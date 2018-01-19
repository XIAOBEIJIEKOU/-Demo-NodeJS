// TestEvent
// var events = require("events");

// var eventEmitter = new events.EventEmitter();

// var connectHandler = function connectHandler(){
// 	//	连接操作
// 	console.log("Connection is succuss !");
// 	//	连接成功之后的操作
// 	eventEmitter.emit("showConnectionInfo",function(){
// 		console.log("ConnectionInfo !");
// 	})
// }
// eventEmitter.on('connection',connectHandler);
// eventEmitter.emit('connection');

// 引入 events 模块
var events = require('events');
// 创建 eventEmitter 对象
var eventEmitter = new events.EventEmitter();

// 创建事件处理程序
var connectHandler = function connected() {
   console.log('连接成功。');
  
   // 触发 data_received 事件 
   eventEmitter.emit('data_received');
}

// 绑定 connection 事件处理程序，
//	需要先定义处理函数，因为js是不编译的
eventEmitter.on('connection', connectHandler);
 
// 使用匿名函数绑定 data_received 事件
eventEmitter.on('data_received', function(){
   console.log('数据接收成功。');
});

// 触发 connection 事件 
eventEmitter.emit('connection');

console.log("程序执行完毕。");
