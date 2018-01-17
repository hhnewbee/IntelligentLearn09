'use strict';

import Vue from 'vue';
//导入全局布局
import './static/css/index.css';
//导入根组件
import index from './components/index.vue';
//导入element-ui的所有样式
import 'element-ui/lib/theme-chalk/index.css';
//全局导入element-ui
import {Menu, MenuItem, Submenu, Popover, Button,Input} from 'element-ui';
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Submenu);
Vue.use(Popover);
Vue.use(Button);
Vue.use(Input);
//导入图标
import '../src/static/css/iconfont.css';

//时间出来组件
import Moment from 'moment';

//导入axios
import Axios from 'axios';
//在原型上添加，这样所有的vue对象都可以使用axios
Vue.prototype.$ajax=Axios;
//全局配置
Axios.defaults.baseURL='http://localhost:3100/IL09api/';

//vue的全局拦截器
Vue.filter("formatDate",function (value) {
    return Moment(value).format("YYYY-MM-DD");
});

//axios的默认配置
new Vue({
    el:'#index',
    render:c=>c(index)
});