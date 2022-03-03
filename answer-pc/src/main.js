import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import './assets/css/style.scss'

//fontawesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
library.add(faUserSecret)
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
    //fontawesome
    // Vue.prototype.Local = Local

//配置 axios
Vue.use(VueAxios, axios)
import '@/utils/request.js'

// 配置 element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import "@/assets/css/style.scss"; //全局样式
import "@/assets/css/responsive.css"; //全局响应样式

Vue.config.productionTip = false

Vue.mixin({
    data() {
        return {}
    },
    methods: {
        /**
         * @description: 给相对路径补全成绝对路径
         * @author: 啥也不是
         * @return {*} 资源的绝对路径
         * @param {*} imagePath 资源的相对路径
         */
        getAbsPath(imagePath) {
            return process.env.VUE_APP_API_URL + "/" + imagePath;
        }
    }
});

Vue.filter("NumFormat", function(value) {
    value += "";
    if (!value) return "0.00";
    let intPart = Number(value).toFixed(0); //获取整数部分
    let intPartFormat = intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,"); //将整数部分逢三一断
    let floatPart = ".00"; //预定义小数部分
    let value2Array = value.split(".");
    //=2表示数据有小数位
    if (value2Array.length === 2) {
        floatPart = value2Array[1].toString(); //拿到小数部分
        if (floatPart.length === 1) {
            //补0,实际上用不着
            return intPartFormat + "." + floatPart + "0";
        }
        return intPartFormat + "." + floatPart;
    }
    return intPartFormat + floatPart;
});

Vue.filter("dateFormat", function(date, fmt) {
    date = new Date(date);
    let ret;
    const opt = {
        "Y+": date.getFullYear().toString(), // 年
        "m+": (date.getMonth() + 1).toString(), // 月
        "d+": date.getDate().toString(), // 日
        "H+": date.getHours().toString(), // 时
        "M+": date.getMinutes().toString(), // 分
        "S+": date.getSeconds().toString(), // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(
                ret[1],
                ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0")
            );
        }
    }
    return fmt;
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')