import Vue from 'vue';
//导入全局布局
import './static/css/index.scss';
//导入根组件
import index from './components/index.vue';

//导入element-ui的所有样式
import 'element-ui/lib/theme-chalk/index.css';
//全局导入element-ui
import ElementUI from 'element-ui';

Vue.use(ElementUI);
//导入图标
import '../src/static/css/iconfont.css';

//时间出来组件
import Moment from 'moment';

//导入axios
import Axios from 'axios';
//在原型上添加，这样所有的vue对象都可以使用axios
Vue.prototype.$ajax = Axios;
//全局url配置
Axios.defaults.baseURL = 'http://172.16.116.18:3100/IL09api/';
//axios的拦截器
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

//vue的全局时间拦截器
Vue.filter("formatDate", function (value) {
    return Moment(value).format("YYYY-MM-DD");
});

//路由
import router from './router/router';

//vuex的配置
import {store} from '../src/store/store.js';

new Vue({
    el: '#index',
    store,
    router,
    render: c => c(index),
});