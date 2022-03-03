import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"

Vue.use(Vuex)

import { setToken, setUserInfo, addRoutes } from "@/utils/auth";
import { employerRoutes, developerRoutes } from "@/router/index";
console.log(employerRoutes);

export default new Vuex.Store({
    state: {
        hasLogin: false,
        token: '',
        userInfo: {
            username: '',
            avatar: '',
        },
        routes: [],
    },
    getters: {
        hasLogin(state) {
            return !!state.token; //语法糖 将他的值快速变成布尔值
        },
    },
    //同步
    mutations: {
        setToken(state, token) {
            state.token = token;
            setToken({ token });
        },
        setUserInfo(state, userInfo) {
            state.userInfo = userInfo;
            setUserInfo(userInfo)
        },
        setRoutes(state, routes) {
            state.routes = routes;
            console.log(routes)
        },
    },
    //异步
    actions: {
        login({ commit, dispatch }, userInfo) {
            // userInfo 是一个对象 对象.属性调用 
            // commit调用同步方法
            // dispatch调用异步方法
            commit('setToken', userInfo.token)
            dispatch('getUserInfo', /*userInfo.userId*/ )
        },
        getUserInfo({ commit, dispatch }, /*userId*/ ) {
            axios.get('/user/getUserInfo').then(res => {
                // console.log(res) // res ==> ctx.body
                commit('setUserInfo', res.data.userInfo) //直接取res.userInfo取不到
                dispatch("addDynamicRoutes", res.data.userInfo);
            })
        },
        addDynamicRoutes({ commit }, userInfo) {
            if (userInfo.is_publisher == 1) {
                // console.log(employerRoutes);
                commit("setRoutes", employerRoutes);
                // addRoutes(employerRoutes);
            } else {
                commit("setRoutes", developerRoutes);
                // addRoutes(employerRoutes);
            }
        },
    },
    modules: {}
})