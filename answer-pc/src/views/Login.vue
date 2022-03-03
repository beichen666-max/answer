<template>
    <!-- Info Section -->
    <div class="login-section">
        <div class="image-layer" style = "border-radius: 0px"></div>
        <div class="outer-box">
             <!-- Login Form -->
            <div class="login-form default-form">
                <div class="form-inner">
                    <h3>登录账户</h3>
                    <!--Login Form-->
                    <form method="post">
                        <div class="form-group">
                            <label>用户名</label>
                            <input type="text" v-model="username" placeholder="请输入用户名" required>
                        </div>
                        
                        <div class="form-group">
                            <label>密码</label>
                            <input id="password-field" type="password" v-model="pass" placeholder="请输入密码">
                        </div>

                        <div class="form-group">
                            <div class="field-outer">
                                <router-link class="pwd" to="/chooseIdentity">去注册 &gt;&gt;</router-link>
                                <div class="pwd">忘记密码？</div>
                            </div>
                        </div>

                        <div class="form-group">
                            <button type="button" class="theme-btn btn-style-one" @click="doLogin">登录</button>
                        </div>
                    </form>
                </div>
            </div>
            <!--End Login Form -->
        </div>
    </div>
    <!-- End Info Section -->
</template>

<script>
import {mapActions} from "vuex";
    export default {
        name: "Login",
        data(){
            //数据要写成函数的形式
            return {
                username: '',
                pass: '',
                redirect: "",
            }
        },
    watch: {
        $route: {
        handler: function (route) {
            const query = route.query;
            if (query) {
            this.redirect = query.redirect;
            }
        },
        immediate: true,
        },
    },
    methods: {
        ...mapActions(['login']),
        doLogin(){
            this.axios({     // $http.request
                method:"post",
                url:"/user/loginWeb",
                data:{
                username: this.username,
                pass: this.pass
                }
            }).then((res) => {
                // console.log(res.data)  res是一个对象里面有一个data对象                  
                let {state,token,userId} = res.data;
                //解构 名字要一一对应，缺少的显示undifind
                // console.log(state)  
                if(state === 'success'){
                    alert('登录成功');
                    // setToken({token})
                    // this.axios.get('/ getUserInfo')
                    this.login({
                        token,
                        userId,
                    });
                    this.$router.push({
                        //进重定向 或者 dash界面
                        path: this.redirect || "/workbench/dashboard"
                    });
                }else{
                    alert('登陆失败');
                }
            });
        },
    },
};
</script>

<style lang="scss" scoped>
</style>