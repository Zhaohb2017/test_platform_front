<template>
  <el-container>
    <el-header>
      <Head></Head>
    </el-header>
    <el-container>
      <el-aside style="width: 13%; height:100%"><Menu></Menu></el-aside>
      <el-main> <router-view/></el-main>
    </el-container>
  </el-container>

</template>

<script>
import Head from '../head/head.vue'
import Menu from '../menu/menu.vue'
export default {
  components:{
    Head,
    Menu,
  },
  name: 'Home'
}
</script>
<style scoped lang="less">
.el-header, .el-footer {
    color: #333;
    text-align: center;
  }
  
.el-aside {
  background-color:white;
  text-align: left;
  height: 100%;
  min-height: 880px;
  margin-top:2%;
  // border-right: solid 1px #e6e6e6;
  overflow: hidden;
  display: block;
}

.el-submenu{
  height: 100%;
  display: block;
}


.el-main {
  background-color:white;
  color: #333;
  text-align: center;
  margin-left: -1%;
}

body > .el-container {
  margin-bottom: 40px;
}

</style>


