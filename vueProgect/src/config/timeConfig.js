//时间格式化组件
import Moment from 'moment';
import Vue from 'vue';
Moment.locale('zh-cn');

//vue的全局时间拦截器
//精确到天数
Vue.filter("formatDate", function (value) {
    return Moment.unix(value).format("YYYY-MM-DD");
});
//精确到分钟
Vue.filter("formatDateTime", function (value) {
    return Moment(value).format("YYYY-MM-DD HH:mm");
});
//相差时间
Vue.filter("formatFromNow", function (value) {
    return Moment(value).fromNow();
});
