<template>
  <!-- User Sidebar -->
  <div class="user-sidebar">
    <div class="sidebar-inner d-flex flex-column justify-content-lg-between">
      <ul class="navigation">
        <li v-for="item in navigations" :key="item.path">
          <router-link :to="'/workbench/' + item.path">
          <i :class="item.icon">
            </i>{{ item.title }}
            </router-link>
        </li>
        <li>
          <a> <i class="la la-sign-out"></i>退出</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
  name: "UserSidebar",
  props: ["hasIdentity"],
  data() {
    return {
      navigations: [
        {
          path: "my-tasks",
          title: "我的任务",
          icon: "qingmeng-icon icon-my-projects-line-gray",
        },
        {
          path: "publish-task",
          title: "发布任务",
          icon: "qingmeng-icon icon-publish-task-line-gray",
        },
      ], 
    };
  },
  computed: {
    ...mapState(["routes"]),
    navigations(){
      // console.log(this.routes);
      return this.routes[0].children;
    }
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.user-sidebar .navigation li a:hover,
.user-sidebar .navigation li.active a {
  color: #1967d2;
  background: rgba(25, 103, 210, 0.1);

  i::before {
    color: #1967d2;
  }
}

.sidebar-inner {
  height: 100%;
}
</style>
