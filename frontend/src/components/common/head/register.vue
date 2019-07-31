<template>
    <div v-if="register_visible" class="lg">
      <el-dialog 
      title="TesterRunner - 注册" 
      width="25%" 
      center
      :show-close = "false"
      @closed="Closeed" 
      :visible="true">
        
        <el-form ref="registerForm" :model="registerForm" :rules="rules" label-width="60px">
          <el-form-item label="姓名" prop="username">
            <el-input type="text" placeholder="请输入名字" v-model="registerForm.username"></el-input>
          </el-form-item>

          <el-form-item label="密码" prop="pwd">
            <el-input type="password" placeholder="请输入密码" v-model="registerForm.pwd"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="register_visible = false">取 消</el-button>
          <el-button type="primary" @click="Register">注 册</el-button>
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
        register_visible: this.visible,
        registerForm: {
          username: '',
          pwd: ''
        },

        rules: {
          username: [
            {
              required: true, message: '名字不能为空', trigger: 'blur'
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
        this.register_visible = val
      },

      register_visible(val){
        this.$emit('update:visible', val)
      }
    },

    methods: {
      Closeed(){
        this.register_visible = false;
      },

      Register(){
        let that = this;
        axios({
              method:'post',
              url:'/api/register',
            data: {
                username: this.registerForm.username,
                pwd: this.registerForm.pwd,
            }
           }).then(function(resp){
              console.log("data: %s", resp.data)
              that.$refs['registerForm'].resetFields()
              that.$message.success(resp.data['msg'])
              if(resp.data['msg'] === "注册成功"){
                // 改变登录状态
                that.$store.commit("$_setStorage", resp.data['data']);
              }
              setTimeout(() => {
                  that.$emit("reload")
              }, 500);
           }).catch(resp => {
              that.$message.success(resp.data['msg'])
           });
      },

      handleClose(done) {
        this.Closeed();
      }
    },
  }
</script>
