//创建一个WS服务器：
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: process.env.WSPORT || 3200
    });

//不同课程或者文章的讨论组
const themeMap = new Map();

//监听客户端连接事件 ws - 是每个客户链接的实例
wss.on('connection', function (ws) {
    //每个用户的信息监听
    ws.on('message', function (message) {
        let data = JSON.parse(message);
        //如果是用户加入信息
        if (data.type === 'join') {
            //初始化每个websocket客户端的信息
            this.nickName = data.nickName;
            this.avatarUrl = data.avatarUrl;
            this.theme = data.theme;
            //判断该讨论组是否已经存在
            if (themeMap.has(data.theme)) {
                themeMap.get(data.theme).set(data.nickName, this);
            } else {
                themeMap.set(data.theme, new Map([[data.nickName, this]]));
            }
            //广播用户的加入信息
            themeMap.get(data.theme).forEach(client => {
                //把目前所有房间内人员的信息发给新用户
                if (client.nickName !== data.nickName) {
                    this.send(JSON.stringify({
                        nickName: client.nickName,
                        avatarUrl: client.avatarUrl,
                        type: "join"
                    }));
                    //将新加入用户的信息告诉所有房间内的用户
                    client.send(JSON.stringify({
                        nickName: data.nickName,
                        avatarUrl: data.avatarUrl,
                        type: "join"
                    }));
                }
            })
            //如果是用户发送信息
        } else {
            //判断是发送给谁的信息
            if (themeMap.has(data.target)) {
                //如果是群聊信息
                themeMap.get(data.theme).forEach((client) => {
                    if (client.nickName!==data.nickName) {
                        client.send(JSON.stringify(data));
                    }
                })
                //个人用户信息
            } else {
                themeMap.get(data.theme).get(data.target).send(JSON.stringify(data));
            }
        }
    });

    //每个用户关闭监听
    ws.on('close', function () {
        //广播用户已近退出
        themeMap.get(this.theme).forEach(client => {
                    if (client.nickName !== this.nickName) {
                        client.send(JSON.stringify({
                            nickName: this.nickName,
                            type: 'exit'
                        }));
                    } else {
                        //删除用户
                        themeMap.get(this.theme).delete(client.nickName);
                    }
                });
    });
    //防止用户退出时报错服务器退出
    ws.on('error', function (event) {
    })
});