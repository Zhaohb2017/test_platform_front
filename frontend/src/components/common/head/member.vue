<template>
    <div>
        <el-button type="primary" @click="OpenFormFun">修改密码</el-button>
        <div v-show="edit_pwd">
            <el-form ref="loginform" :model="loginform" :rules="rules" label-width="60px">
            <el-form-item label="邮箱" prop="username">
                <el-input type="email" placeholder="请输入邮箱" v-model="loginform.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="pwd">
                <el-input type="password" placeholder="请输入密码" v-model="loginform.pwd"></el-input>
            </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="edit_pwd = false">取 消</el-button>
            <el-button type="primary" @click="LoginToServer">登录</el-button>
            </span>
        </div>
    </div>
</template>

<style lang="less" >
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
  export default {
    props:['visible'],
    data() {
      return {
        edit_pwd: false,


        login_visible: this.visible,
        editform: {
          old_pwd: '',
          current_pwd: ''
        },

        rules: {
          username: [
            {
              required: true, message: '邮箱不能为空', trigger: 'blur'
            },
            {
              type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change'] 
            }
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

      LoginToServer(){

      },

      OpenFormFun(){
          this.edit_pwd = true;
      },

      handleClose(done) {
        this.Closeed();
      }
    },
  }
</script>
