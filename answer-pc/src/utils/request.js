import axios from "axios";
import { MessageBox, Message } from 'element-ui'
import router from '@/router/index'
import { getToken } from "@/utils/auth";

// 添加请求拦截器
axios.interceptors.request.use(
    (config) => {
        config.baseURL = process.env.VUE_APP_API_URL;
        let tokenInfo = getToken();
        if (tokenInfo) {
            config.headers['Authorization'] = tokenInfo.token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// 响应拦截器
axios.interceptors.response.use(
    (response) => {
        // res = {
        //     "code": "2200",
        //     "data": {
        //         state: "success"
        //     }
        // } 
        // res = {
        //     "code": "2401",
        //     "message": "参数不正确"
        // } 
        const res = response.data;
        // console.log(res);
        // if the custom code is not 2200, it is judged as an error.
        if (res.code !== 2200) {
            Message({
                message: res.message || "Error",
                type: "error",
                duration: 5 * 1000,
            });

            //   // 2401: Illegal token; 50012: Other clients logged in; 50014: Token expired;
            if (res.code === 1401) {
                // to re-login
                MessageBox.confirm(
                    "You have been logged out, you can cancel to stay on this page, or log in again",
                    "Confirm logout", {
                        confirmButtonText: "Re-Login",
                        cancelButtonText: "Cancel",
                        type: "warning",
                    }
                ).then(() => {
                    //   router.push("/login"); // 去登录页面
                    Message.warn("你已被登出，请重新登录");
                });
            }
            console.log(res);
            return Promise.reject(new Error(res.message || "Error"));
        } else {
            // console.log(res.data) res是一个对象里面有一个data对象
            return res;
        }

    },
    (error) => {
        // console.log("err" + error); // for debug
        // Message({
        //   message: error.message,
        //   type: "error",
        //   duration: 5 * 1000,
        // });
        return Promise.reject(error);
    }
);