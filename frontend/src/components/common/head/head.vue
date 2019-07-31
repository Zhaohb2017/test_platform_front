<template>
<div>
    <el-menu
      :default-active="$router.path"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#303133"
      text-color="#FFFFFF"
      active-text-color="rgba(255,255,255,0.7)">

      <!-- 初始页面状态 -->
      <el-menu-item index="1" id="Name" @click="toHome">TesterRunner测试平台</el-menu-item>
      <el-menu-item index="2" @click="toMember">个人中心</el-menu-item>
      <el-menu-item index="3" @click="openDialog" v-show="LoginShow">登录</el-menu-item>
      <el-menu-item index="4" @click="openRegister" v-show="LoginShow">注册</el-menu-item>

      <!-- 登录的头像 - 修改状态 -->
      <el-submenu index="3" v-show="UpdateLoginState">
        <template slot="title" >
          <span id="info">{{UserName}}</span>
        </template>
        <el-menu-item index="3-1" @click="logoutFun">退出</el-menu-item>
      </el-submenu>

    </el-menu>
    <Login :visible.sync="dialogVisible" v-if="dialogVisible" @reload="reload"></Login>
    <Register :visible.sync="registerVisible" v-if="registerVisible" @reload="reload"></Register>
    <Logout :visible.sync="logoutVisible"></Logout>

    
</div>
</template>

<style scoped lang="less">
.topbox{
  text-align: center;
}
// 设置顶部导航栏固定
.el-menu-demo {
  background-color:rgb(6, 121, 84);
  position: fixed;
  width: 100%;
  height: 10vh;
  top: 0;
  left: 0;
  text-align: center;
}

.el-submenu{
  margin-top: 1%;
}

.el-menu.el-menu--horizontal {
  border-bottom: none !important;
}


.el-menu--horizontal>.el-menu-item{
  margin-top: 1%;
}

.el-menu--horizontal>.el-menu-item.is-active {
  border-bottom-color: rgb(6, 121, 84) !important;
  border-bottom: none !important;
}


#Name{
  font-size: 20px;
  text-align: left;
  width: 75%;
  margin-left: 7%;
}

.el-submenu__title{
    text-align: left;
}

#info{
  border-radius: 50%; 
  border: 3px solid #eee; 
  overflow: hidden;
  align-items: center;
  justify-content: center;
  width: 45px;
  height: 45px;
  display: flex;
  margin-top: 10%;
  border-bottom-color: none !important;
  border-bottom: none !important;
}

// a{ text-decoration:none} 
</style>

<script>
  import Login from './login.vue'
  import Register from './register.vue'
  import Logout from './logout.vue'

  export default {
    components: {
      Login,
      Logout,
      Register,
    },

    data() {
      return {
        dialogVisible: false,
        logoutVisible: false,
        registerVisible: false,
        UpdateLoginState: false,
        UserName: "",
        LoginShow: true,
      };
    },

    mounted: function(){
      if(this.$store.state.user != null){
        this.LoginShow = false
        this.UserName = this.$store.state.user
        this.UpdateLoginState = true
      }else{
        this.UpdateLoginState = false
        this.LoginShow = true
      }
    },

    beforeUpdate() {
      if(this.$store.state.user != null){
        this.LoginShow = false
        this.UserName = this.$store.state.user
        this.UpdateLoginState = true
      }else{
        this.UpdateLoginState = false
        this.LoginShow = true
      }
      // this.UserName = this.$store.state.user
      // console.log("name: %s", this.UserName)
    },

    updated() {
      this.UserName = this.$store.state.user
    },

    methods: {
      reload(){
            if(this.dialogVisible == true){
                console.log("登录组件调用了刷新")
                this.dialogVisible = false;
            }
            if(this.registerVisible == true){
                console.log("注册组件调用了刷新")
                this.registerVisible = false;
            }
        },

      openDialog() {
        this.dialogVisible = true;
      },

      openRegister(){
          this.registerVisible = true;
      },

      logoutFun(){
        this.logoutVisible = true;
      },

      toMember(){
        if(this.$store.state.user){
          this.$router.push('/member')
        }else{
          this.$message.error("请先登录.")
        }
      },

      toHome(){
        this.$router.push('/')
      }
    }
  };
</script>
