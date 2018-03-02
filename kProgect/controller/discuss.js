//创建一个WS服务器：
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer( {
        port: process.env.WSPORT || 3200
    });
//监听客户端连接事件 ws - 是每个客户链接的实例
wss.on('connection', function(ws,req) {
    //设置ws实例的标识，昵称,头像链接
    let data=JSON.parse(req.url.substring(1));
    ws.nickName=data.nickName;
    ws.avatarUrl=data.avatarUrl;
    //信息监听
    ws.on('message', function(data) {
        console.log(JSON.parse(data));
    });
    //关闭监听
    ws.on('close', function() {

    });
    //把目前所有房间内人员的信息发给新用户
     this.clients.forEach(function (client) {
         ws.send(JSON.stringify({
             nickName: client.nickName,
             avatarUrl:client.avatarUrl,
             type: "join"
         }));
     });
    //将新加入用户的信息告诉所有房间内的用户
    wss.broadcast({
        nickName: ws.nickName,
        avatarUrl:ws.avatarUrl,
        type: "join"
    });
});
//广播
wss.broadcast = function(data) {
    this.clients.forEach(function (client) {
        client.send(JSON.stringify(data));
    });
};