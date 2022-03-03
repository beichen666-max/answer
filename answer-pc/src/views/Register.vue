<template>
  <div class="login-section">
    <div class="image-layer"></div>
    <div class="outer-box">
      <!-- Login Form -->
      <div class="login-form default-form">
        <div class="form-inner">
          <h3>注册账户</h3>

          <div class="form-group">
            <label>用户名</label>
            <input type="text" v-model="username" placeholder="请输入用户名" />
          </div>

          <div class="form-group">
            <label>密码</label>
            <input
              type="password"
              v-model="password"
              placeholder="请输入密码"
            />
          </div>

          <div class="row form-group box">
            <p class="col-lg-6">
              <label>电话</label>
              <input type="text" v-model="phone" placeholder="请输入您的电话" />
            </p>
            <p class="col-lg-6">
              <label>验证码</label>
              <input type="text" placeholder="请输入验证码" />
              <button
                type="button"
                id="code-btn"
                class="theme-btn btn-style-three large"
              >
                获取验证码
              </button>
              <button
                type="button"
                id="code-btn"
                class="time theme-btn btn-style-three large"
              ></button>
            </p>
          </div>
          <div class="form-group submit">
            <button class="theme-btn btn-style-one" @click="doRegister">
              注册
            </button>
          </div>
        </div>
      </div>
      <!--End Login Form -->
    </div>
  </div>
</template>

<script>
export default {
  name: "Register",
  data() {
    return {
      identity: "",
      username: "",
      password: "",
      phone: "",
    };
  },
  created() {
    this.identity = this.$route.params.id;
  },
  methods: {
    async doRegister() {
      if (this.username.trim() == "") {
        this.$message.error("请填写用户名!");
      } else if (this.password.trim() == "") {
        this.$message.error("请填写密码!");
      } else if (this.phone.trim() == "") {
        this.$message.error("请填写手机号!");
      } else {
        let res = await this.axios.post("/user/register", {
          identity: this.identity,
          username: this.username,
          pass: this.password,
          tel: this.phone,
        });
        let { state } = res.data;        
        if (state === "success") {
          this.$router.push("/login");
        } else if(state === 'error_insert_fail') {
          this.$message.error("注册失败，请再试一次!");
        }else if(state === "error_user_exists"){
          this.$message.error("该用户已存在!");

        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.login-section .image-layer {
  background-image: url(../assets/images/background/register-bg.png);
  position: absolute;
  left: 0;
  top: 0;
  height: calc(100% - 170px);
  margin: 120px 0 50px;
  border-radius: 0 20px 20px 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}
.box {
  display: flex;
  justify-content: space-between;
  p {
    position: relative;
    margin-bottom: 20px;
    #code-btn {
      position: absolute;
      bottom: -10px;
      right: 10px;
      width: 40%;
      padding: 20px 20px;
      &.time:hover {
        background-color: #e2eaf8;
        color: #1967d2;
      }
    }
  }
}
.submit {
  margin-top: 20px;
}
</style>
