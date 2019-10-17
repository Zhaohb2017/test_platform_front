<template>
  <div id="website">
    <Head></Head>
    <el-row class="content">
        <el-col :span="3" style="height:100%">
            <Menu></Menu>
        </el-col>
        <el-col :span="21">
            <router-view/>
         </el-col>
    </el-row>
</div>
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
.el-row{
    height: 100%;
    width: 100%;
    // max-height: 90vh;
    position: fixed;
    overflow-y: auto;
}

.content{
    margin-top: 10vh;
    height: 100%;
}
.content-main{
    float: left;
}
#website{
    // text-align: center;
    width: 100%;
    height: 100%;
}

.el-col el-col-3{
  position: fixed;
}

.el-col el-col-21{
  height: 100%;
  overflow-y: auto;
}
</style>
