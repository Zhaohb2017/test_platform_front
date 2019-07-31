<template>
    <div v-if="login_visible" class="lg">
      <el-dialog 
      title="TesterRunner - 登录"
      width="25%"
      center
      :show-close = "false"
      @closed="Closeed" 
      :visible="true">
        
        <el-form ref="loginform" :model="loginform" :rules="rules" label-width="60px">
          <el-form-item label="账号" prop="username">
            <el-input type="text" placeholder="请输入用户名" v-model="loginform.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input type="password" placeholder="请输入密码" v-model="loginform.pwd"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="login_visible = false">取 消</el-button>
          <el-button type="primary" @click="LoginToServer">登录</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<style lang="less" scoped>
.lg{
  text-align: center;
}

.el-input{
  float: left;
}

//  弹窗样式
.el-dialog__wrapper{
  margin-top: 16vh;
}

// 底部按钮居中
.el-dialog__footer{
  text-align: center;
}

// 按钮样式
.el-button{
  margin: 0 5%;
}

</style>


<script>
import axios from 'axios'
  export default {
    props:['visible'],
    data() {
      return {
        login_visible: this.visible,
        loginform: {
          username: '',
          pwd: ''
        },

        rules: {
          username: [
            {
              required: true, message: '用户名不能为空', trigger: 'blur'
            },
          ],

          pwd: [
            {
               required: true, message: '密码不能为空', trigger: 'blur'
            }
          ]
        }

      };
    },

    watch:{
      visible(val){
        this.login_visible = val
      },

      login_visible(val){
        this.$emit('update:visible', val)
      }
    },

    methods: {
      Closeed(){
        this.login_visible = false;
        // this.$emit('update:visible', false)
      },

      UpdateReload(){
        
      },

      LoginToServer(){
        let that = this;
        axios({
              method:'post',
              url:'/api/login',
            data: {
                username: this.loginform.username,
                pwd: this.loginform.pwd,
            }
           }).then(function(resp){
              if(resp.data['msg'] == "登录成功"){
                that.$message.success(resp.data['msg'])
              }else if(resp.data['msg'] == "用户已登录，请勿重复登录"){
                that.$message.error(resp.data['msg'])
              }else{
                that.$message.error(resp.data['msg'])
              }
              // 改变登录状态
              that.$store.commit("$_setStorage", resp.data['data']);

              // 重置状态，友好提示
              that.$refs['loginform'].resetFields()

              setTimeout(() => {
                  that.$emit("reload")
              }, 500);

           }).catch((error, resp) => {
              console.log("error: ", error)
              that.$message.error(resp.data['msg'])
              that.$store.commit("$_removeStorage")
           });
      },

      handleClose(done) {
        this.Closeed();
      }
    },
  }
</script>
