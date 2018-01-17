'use strict';

import Vue from 'vue';
//导入全局布局
import './static/css/index.css';
//导入根组件
import index from './components/index.vue';
//导入element-ui的所有样式
import 'element-ui/lib/theme-chalk/index.css'
//导入图标
import '../src/static/css/iconfont.css'
new Vue({
    el:'#index',
    render:c=>c(index)
});