import Vuex from 'vuex'
import Vue from 'vue';
import {info} from '../store/modules/info';
Vue.use(Vuex);
export const store = new Vuex.Store({
    modules:{
        info
    }
});