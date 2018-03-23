import Vuex from 'vuex'
import Vue from 'vue';
import {info} from '../store/modules/info';
import {course} from '../store/modules/course';
import state from './state';
import getters from './getters';
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules:{
        info,
        course
    },
    state,
    getters
});