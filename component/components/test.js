function pareseUrl(url) {
    if (!url.match(/http:\/\/.+/)) {
        throw "url格式错误";
    }
    let protocal = url.substring(0, url.indexOf(':'));
    let domaim = url.substring(url.indexOf('//') + 2);
    let host = domaim.substring(0, domaim.indexOf('/') === -1 ? undefined : domaim.indexOf('/'));
    let path = undefined;
    let queryString = undefined;
    let hash = undefined;
    let query = {};
    if (domaim.match('/')) {
        path = domaim.substring(domaim.indexOf('/') + 1, domaim.indexOf('?') === -1 ? undefined : domaim.indexOf('?'));
    }
    if (domaim.match(/\?/)) {
        queryString = domaim.substring(domaim.indexOf('?') + 1, domaim.indexOf('#') === -1 ? undefined : domaim.indexOf('#'));
        let querys = queryString.split('&');
        querys.forEach(qy => {
            query[qy.split('=')[0]] = qy.split('=')[1];
        })
    }
    if (domaim.match('#')) {
        hash = domaim.substring(domaim.indexOf('#') + 1);
    }
    return {
        protocal,
        host,
        path,
        query,
        hash
    }
}

//https://segmentfault.com/a/1190000007173074
function verify(test) {
    let leftReg = /[\(\<\{\[]/, stack = [], special = "}{";
    if (test === special) {
        return 1;
    }
    test = test.split('');
    for (let tt of test) {
        if (leftReg.test(tt)) {
            stack.push(tt);
        }
        else {
            switch (tt) {
                case ')':
                    return Number(stack.pop() === '(');
                case '>':
                    return Number(stack.pop() === '<');
                case ']':
                    return Number(stack.pop() === '[');
                case '}':
                    return Number(stack.pop() === '{');
            }
        }
    }
    return Number(stack.length === 0);
}

async  function trafficLight() {
    while(1){
        await new Promise(function(resolve, reject) {
            setTimeout(resolve, 10000)
        });
        console.log("greenLight");
        await new Promise(function(resolve, reject) {
            setTimeout(resolve, 3000)
        });
        console.log("yellowLight");
        await new Promise(function(resolve, reject) {
            setTimeout(resolve, 5000)
        });
        console.log("redLight");
    }
}
