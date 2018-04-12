//时间格式化组件
import Moment from 'moment';
import Vue from 'vue';
Moment.locale('zh-cn');

//全局支持
window.$moment=Moment;
Vue.prototype.$moment=Moment;

//vue的全局时间拦截器
//精确到天数
Vue.filter("formatDate", function (value) {
    return Moment(new Date(value)).format("YYYY-MM-DD");
});
//精确到分钟
Vue.filter("formatDateTime", function (value) {
    return Moment(new Date(value)).format("YYYY-MM-DD HH:mm");
});
//相差时间
Vue.filter("formatFromNow", function (value) {
    return Moment(new Date(value)).fromNow();
});

//得到日期
Vue.prototype.$formatDate=function (value) {
    return Moment(new Date(value)).format("YYYY-MM-DD");
};
//精确到分钟
Vue.prototype.$formatTime=function (value) {
    return Moment(new Date(value)).format("YYYY-MM-DD HH:mm");
};
//得到小时时间时间段
Vue.prototype.$formatHouse=function (value) {
    return Moment.duration(value).asHours().toFixed(1);
};
//得到分钟时间时间段
Vue.prototype.$formatMinutes=function (value) {
    return Math.ceil(Moment.duration(value).asMinutes());
};
