//创建一个WS服务器：
const WebSocketServer = require('ws').Server,
    wss = new WebSocketServer({
        port: process.env.WSPORT || 3200
    });

//不同课程或者文章的讨论组
const themeArray = [];

//监听客户端连接事件 ws - 是每个客户链接的实例
wss.on('connection', function (ws) {
    //每个用户的信息监听
    ws.on('message', function (message) {
        let data=JSON.parse(message);
        //如果是用户加入信息
        if(data.type==='join'){
            let ifHas = false;
            ws.nickName = data.nickName;
            ws.avatarUrl = data.avatarUrl;
            ws.theme=data.theme;
            themeArray.forEach((theme) => {
                //该讨论组是否已经存在
                if (theme.theme === data.theme) {
                    theme.clientArray.push(ws);
                    ifHas = true;
                }
            });
            //如果该讨论组不存在则新加入
            if (!ifHas) {
                themeArray.push({theme: data.theme, clientArray: [ws]});
            }

            themeArray.forEach((theme)=>{
                if(theme.theme===data.theme){
                    theme.clientArray.forEach(client=>{
                        if(client.nickName!==data.nickName){
                            //把目前所有房间内人员的信息发给新用户
                            ws.send(JSON.stringify({
                                nickName: client.nickName,
                                avatarUrl: client.avatarUrl,
                                type: "join"
                            }));
                            //将新加入用户的信息告诉所有房间内的用户
                            client.send(JSON.stringify({
                                nickName: ws.nickName,
                                avatarUrl: ws.avatarUrl,
                                type: "join"
                            }));
                        }
                    })
                }
            });
            //如果是用户发送信息
        }else{
            themeArray.forEach((theme)=>{
                //判断属于哪个讨论组
                if(data.theme===theme.theme){
                    //判断是发送给谁的信息
                    if(data.target===theme.theme){
                        //群聊信息
                        theme.clientArray.forEach((client)=>{
                            if(data.nickName!==client.nickName){
                                client.send(JSON.stringify(data));
                            }
                        })
                        //个人用户信息
                    }else{
                        theme.clientArray.forEach((client)=>{
                            if(data.target===client.nickName){
                                client.send(JSON.stringify(data));
                            }
                        })
                    }
                }
            })
        }
    });

    //每个用户关闭监听
    ws.on('close', function () {
        themeArray.forEach((theme)=>{
            if(theme.theme===this.theme){
                theme.clientArray.forEach(client=>{
                    if(client.nickName!==this.nickName){
                        client.send(JSON.stringify({
                            nickName:this.nickName,
                            type:'exit'
                        }));
                    }else{
                        //删除用户
                        theme.clientArray.splice(theme.clientArray.findIndex(client),1);
                    }
                });
            }
        });
});
    ws.on('error',function (event) {
    })
});