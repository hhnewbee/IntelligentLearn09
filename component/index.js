import Vue from 'vue';

//导入全局布局
import './static/scss/index.scss';
//导入全局图标
import './static/icon/fontawesome-all.css';
//导入第一个子组件
import index from './index.vue';
//导入element-ui的所有样式
import 'element-ui/lib/theme-chalk/index.css';
//全局导入element-ui
import ElementUI from 'element-ui';
Vue.use(ElementUI);

//导入格式化时间配置
import './config/timeConfig';

//路由
import router from './router/router';

//实例化根组件
new Vue({
    el: '#index',
    router,
    render: c => c(index),
});