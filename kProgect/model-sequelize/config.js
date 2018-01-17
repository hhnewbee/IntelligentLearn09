// config files:
const defaultConfig = './config-default.js';
const productConfig = './config-product.js';
const testConfig = './config-test.js';

const fs = require('fs');

let config = null;

//默认配置
config = require(defaultConfig);
console.log(`Load ${defaultConfig}...`);

if (process.env.NODE_ENV === 'test') {
    config = Object.assign(config, require(testConfig));
    console.log(`Load ${testConfig}...`);
} else {
    try {
        if (fs.statSync(productConfig).isFile()) {
            config = Object.assign(config, require(productConfig));
            console.log(`Load ${productConfig}...`);
        }
    } catch (err) {
        console.log(`Cannot load ${productConfig}.`);
    }
}

module.exports = config;
