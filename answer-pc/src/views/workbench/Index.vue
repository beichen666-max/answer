
<template>
  <div class="workbench-wrapper">
		<UserSidebar></UserSidebar>
    <section class="user-dashboard">
      <router-view />
    </section>
  </div>
</template>

<script>
	import UserSidebar from "./components/UserSidebar.vue";

export default {
  name: "Workbench",
  data() {
    return {};
  },
  components: {
      UserSidebar
  },
  methods: {},
  created() {},
};
</script>

<style>
</style>
