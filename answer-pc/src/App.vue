<!--
 * @Author: your name
 * @Date: 2021-10-21 22:13:44
 * @LastEditTime: 2021-11-04 12:11:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \qingmeng\qingmeng-pc\src\App.vue
-->
<template>
<div id="app">
    <div class="page-wrapper">
    <!-- Main Header-->
        <main-header></main-header>
    <!-- End Main Header-->
    <router-view/>
    </div>
</div>
</template>
<script>
import MainHeader from '@/components/MainHeader'
export default {
  components:{
    MainHeader,
  },
};
</script>

<style lang="scss" scoped>
  
</style>

