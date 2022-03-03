<template>
  <header :class="headerStyle">
    <!-- Main box -->
    <div class="main-box">
      <!--Nav Outer -->
      <div class="nav-outer">
        <div class="logo-box">
          <div class="logo">
            <router-link to="/">
              <img :src="require('../assets/images/logo.svg')" alt title />
            </router-link>
            <span style="color: #1967d2; font-weight: 900"> BETA</span>
          </div>
        </div>

        <nav class="nav main-menu">
          <ul class="navigation" id="navbar">
            <li>
              <router-link to="/home">首页</router-link>
            </li>
            <li>
              <router-link to="/tasks">任务大厅</router-link>
            </li>
            <li>
              <router-link to="/developers">人才市场</router-link>
            </li>
            <li>
              <router-link to="/workbench">工作台</router-link>
            </li>
            <li>
              <router-link to="/organization">青盟社团</router-link>
            </li>
            <li>
              <router-link to="/album">实验室</router-link>
            </li>
            
            <li>
              <span>学考练</span>
            </li>
            <li>
              <router-link to="/about">About</router-link>
            </li>
          </ul>
        </nav>
        <!-- Main Menu End-->
      </div>

      <div v-if="hasLogin" class="outer-box">
        <!-- Login/Register -->
        <!-- Dashboard Option -->
        <!-- <button class="menu-btn">
          <span class="count">1</span>
          <span class="icon la la-heart-o"></span>
        </button> -->

        <div class="dropdown dashboard-option">
          <a
            class="dropdown-toggle"
            role="button"
            data-toggle="dropdown"
            aria-expanded="false"
            @click.stop="showDrop"
          >
            <img
              :src="getAbsPath(userInfo.avatar)"
              alt="avatar"
              class="thumb"
            />
            <span class="name">{{ userInfo.username }}</span>
          </a>
          <ul class="dropdown-menu" :class="{ show: isDropShow }">
            <li @click="logout">
              <a> <i class="la la-sign-out"></i>退出</a>
            </li>
          </ul>
        </div>
      </div>
      <div v-else class="btn-box">
        <router-link to="/login" class="theme-btn btn-style-three call-modal"
          >登录</router-link
        >
      </div>
    </div>

    <!-- Mobile Header -->
    <div class="mobile-header">
      <div class="logo">
        <router-link to="/">
          <img src="/images/logo.svg" alt title />
        </router-link>
      </div>

      <!--Nav Box-->
      <div class="nav-outer clearfix">
        <div class="outer-box">
          <!-- Login/Register -->
          <div class="login-box">
            <a href="login-popup.html" class="call-modal">
              <span class="icon-user"></span>
            </a>
          </div>

          <a href="#nav-mobile" class="mobile-nav-toggler">
            <span class="flaticon-menu-1"></span>
          </a>
        </div>
      </div>
    </div>

    <!-- Mobile Nav -->
    <!-- <div id="nav-mobile"></div>
		<div class="sidebar-backdrop"></div> -->
  </header>
</template>

<script>
import { mapState, mapGetters } from "vuex";
export default {
  name: "MainHeader",
  computed: {
    ...mapState(["userInfo"]),
    ...mapGetters(["hasLogin"]),
    headerStyle() {
      let style = "main-header";
      if (
        this.$route.path.includes("workbench") &&
        this.$route.name != "Error"
      ) {
        style += " header-shaddow";
      }
      return style + " " + this.headerClass;
    },
  },
  data() {
    return {
      isDropShow: false,
    };
  },
  mounted() {
    document.body.onclick = () => {
      this.isDropShow = false;
    };
  },
  watch: {
			$route() {
				this.isDropShow = false;
			},
		},
  methods: {
    showDrop() {
      this.isDropShow = !this.isDropShow;
      if (this.isDropShow) {
        document.body.className = "mm-wrapper user-sidebar-active";
      } else {
        document.body.className = "mm-wrapper";
      }
    },
    hideDrop() {
      this.isDropShow = false;
      document.body.className = "mm-wrapper";
    },
    logout() {
      this.$confirm("退出系统 ？")
        .then(() => {
          this.$router.push(`/login?redirect=${this.$route.fullPath}`);
        });
    },
  },
};
</script>

<style lang="scss">
// .main-header{
//   background: #fff;
// }
.logo img {
  height: 50px;
}

.main-menu .navigation > li > a {
  &.router-link-active,
  &:hover {
    color: #1967d2;
  }
}

.dashboard-option .dropdown-menu li a {
  &.router-link-exact-active,
  &:hover {
    color: #1967d2;
    background: rgba(25, 103, 210, 0.1);
  }
}
</style>
