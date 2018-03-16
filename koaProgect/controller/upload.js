const os = require('os');
const path = require('path');
const fs = require('fs');
const config=require('../config');


const upload = async function(ctx,type) {
    //指定操作系统的临时文件的默认目录。
    const tmpdir = os.tmpdir();
    const filePaths = [];
    let fileName='';
    const files = ctx.request.body.files || {};

    for (let key in files) {
        const file = files[key];
        const filePath = path.join(config.rootPath, "assets/"+type+"/studySource",file.name);
        const reader = fs.createReadStream(file.path);
        const writer = fs.createWriteStream(filePath);
        reader.pipe(writer);
        fileName=file.name;
        filePaths.push(filePath);
    }

    console.log(type+"上传完成上传完成");

    ctx.body = {url:"http://localhost:3100/"+type+"/studySource/"+fileName};
};
module.exports={
    upload
};