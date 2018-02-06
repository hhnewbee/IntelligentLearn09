//创建一个WS服务器：
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: process.env.WSPORT || 3200
    });
//监听客户端连接事件
wss.on('connection', function(ws) {
    //信息监听
    ws.on('message', function(data) {

    });
    //关闭监听
    ws.on('close', function() {

    });
    //把目前所有房间内人员的信息发给新用户
    for (let i in this.clients) {
        //todo 其他用户数据
        ws.send(JSON.stringify({
            nick: this.clients[i].nick,
            uid: this.clients[i].uid,
            type: "join"
        }));
    }
    //将新加入用户的信息告诉所有房间内的用户
    //todo 查找用户数据
    wss.broadcast({
        nick: ws.nick,
        uid: ws.uid,
        type: "join"
    });
});
//广播
wss.broadcast = function(data) {
    for (let i in this.clients) this.clients[i].send(JSON.stringify(data));
};