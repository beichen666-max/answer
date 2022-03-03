import { Session } from "./index";
import router from '@/router'

const TOKEN_KEY = "QM-TOKEN";
const USERINFO_KEY = "QM-USERINFO";

// token相关方法
export function getToken() {
    return Session.get(TOKEN_KEY);
}

export function setToken(token) {
    Session.set(TOKEN_KEY, token);
}
export function removeToken() {
    Session.remove(TOKEN_KEY);
}

// userinfo相关方法
export function getUserInfo() {
    return Session.get(USERINFO_KEY);
}
export function setUserInfo(userinfo) {
    Session.set(USERINFO_KEY, userinfo);
}
export function removeUserInfo() {
    Session.remove(USERINFO_KEY);
}

export function addRoutes(routes) {
    router.addRoutes(routes)
}