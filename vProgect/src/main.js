'use strict';

import Vue from 'vue';
//导入根组件
import Main from './components/main.vue';

new Vue({
    el:'#main',
    render:c=>c(Main)
});