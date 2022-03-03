<!--
 * @Author: your name
 * @Date: 2021-10-28 12:52:56
 * @LastEditTime: 2021-11-10 11:50:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \qingmeng\qingmeng-pc\src\views\Home.vue
-->
<template>
</template>

<script>
import { getToken } from "@/utils/auth";
export default {
  name: "Home",
  data() {
    return {
      blogList: [],
      cateList: [],
    };
  },
  created() {
    this.checkLogin();
  },
  methods: {
    checkLogin(){
      this.axios({
        method:"post",
        url:"/user/checkLogin",
        //有s
        // headers:{
        //   "Authorization": getToken('mytoken')
        // }
    }).then((res) => {
      let {state} = res;
      if(state === 'fail'){
        this.$router.push('/login');
      }
      });
    },
  },
  created(){
    this.checkLogin()
  }
};
</script>

<style scoped lang="scss">
</style>
