//时间格式化组件
import Moment from 'moment';
import Vue from 'vue';
Moment.locale('zh-cn');

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
//得到小时时间
Vue.prototype.$formatHouse=function (value) {
    return Moment.duration(value).asHours();
};
//得到分钟时间
Vue.prototype.$formatMinutes=function (value) {
    return Moment.duration(value).asMinutes();
};
