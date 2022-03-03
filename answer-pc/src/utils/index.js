//本地存储
export const Local = {
    // 设置
    set(key, val) {
        window.localStorage.setItem(key, JSON.stringify(val));
    },
    // 获得
    get(key) {
        let json = window.localStorage.getItem(key); //设置存储的时候转换成了json格式 需要再转换出来
        try {
            return JSON.parse(json);
            //try使用捕捉错误 如果不是json对象可以继续运行
        } catch (error) {
            return json;
        }
    },
    // 移除
    remove(key) {
        window.localStorage.removeItem(key);
    }
}

//临时存储
export const Session = {
    // 设置
    set(key, val) {
        window.sessionStorage.setItem(key, JSON.stringify(val));
    },
    // 获得
    get(key) {
        let json = window.sessionStorage.getItem(key); //设置存储的时候转换成了json格式 需要再转换出来
        try {
            return JSON.parse(json);
            //try使用捕捉错误 如果不是json对象可以继续运行
        } catch (error) {
            return json;
        }
    },
    // 移除
    remove(key) {
        window.sessionStorage.removeItem(key);
    }
}