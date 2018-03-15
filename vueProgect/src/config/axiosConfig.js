import Vue from 'vue';
import Axios from 'axios';
import ElementUI from 'element-ui';

//全局url配置
Axios.defaults.baseURL = 'http://172.16.116.18:3100/IL09api/';

//java后端的配置
const axiosJava=Axios.create({
    baseURL:'http://172.16.148.27:8080/'
});

//nodejs后端的配置
const axiosNodeJs=Axios.create({
    baseURL:'http://172.16.116.18:3100/'
});

//axios全局的拦截器
let loadingInstance;
Axios.interceptors.request.use(function (config) {
    //请求时显示加载中
    loadingInstance = ElementUI.Loading.service({
        text: 'Loading...',
        spinnerType: 'fading-circle'
    });
    return config;
});
Axios.interceptors.response.use(function (config) {
    //响应后关闭图标
    loadingInstance.close();
    return config;
});

//在原型上添加，这样所有的vue对象都可以使用axios
Vue.prototype.$ajax = Axios;
Vue.prototype.$ajaxJava = axiosJava;
Vue.prototype.$ajaxNodeJs = axiosNodeJs;

