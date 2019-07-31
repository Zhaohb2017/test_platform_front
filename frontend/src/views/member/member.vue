<template>
    <div>
        <div class="change">
          <el-button type="primary" @click="OpenFormFun">重置密码</el-button>
        </div>

        <div class="edit" v-show="edit_pwd">
            <el-form ref="editform" :model="editform" :rules="rules" label-width="120px">

              <el-form-item label="设置密码" prop="first_pwd">
                  <el-input type="password" placeholder="请输入密码" v-model="editform.first_pwd"></el-input>
              </el-form-item>

              <el-form-item label="确认密码" prop="last_pwd">
                  <el-input type="password" placeholder="请再次输入一遍密码" v-model="editform.last_pwd"></el-input>
              </el-form-item>

              <span v-show="error_flag" class="tips">{{errorText}}</span>
            </el-form>

            <span slot="footer" class="dialog-footer">
              <el-button type="danger" @click="Cancel">取 消</el-button>
              <el-button type="primary" @click="RemoveData">清 除</el-button>
              <el-button type="primary" @click="ChangePassword">提 交</el-button>
            </span>

        </div>

    </div>
</template>

<style lang="less" scoped>
.change{
  margin: 2%;
  float: left;
  position:fixed;
}


.edit{
  position: fixed;
  width: 100%;
  margin-left: 15%;
  margin-top: 2%;
  text-align: center;
}

.el-form{
  margin-bottom: 2%;
  width: 30%;
}

.el-form-item__label{
  // font-size: 18px;
  // margin-left: 5%;
  // margin-bottom: 2%;
  margin-right: 2%;
  color: #616161;
  
}

.el-form-item__content{
  margin-left: 5%;
}


.dialog-footer{
  float: left;
  margin-left: 8%;
}

.tips{
  color: red;
  font-weight: 500;
}
</style>


<script>
  export default {
    props:['visible'],
    data() {
      return {
        edit_pwd: false,

        error_flag: false,
        errorText: "两次密码不一致，请重新输入.",

        editform: {
          first_pwd: '',
          last_pwd: ''
        },

        rules: {
          first_pwd: [
            {
              required: true, message: '新密码不能为空', trigger: 'blur'
            },
            
          ],
          last_pwd: [
            {
               required: true, message: "请再次输入新密码", trigger: 'blur'
            }
          ]
        }

      };
    },

    methods: {
      ChangePassword(){
        var f_PWD = this.editform.first_pwd
        var l_PWD = this.editform.last_pwd
        // console.log(this.editform.first_pwd, this.editform.last_pwd)
        if(f_PWD != "" && l_PWD != "" && f_PWD === l_PWD){
            //  请求后台修改密码
        }else{
          this.error_flag = true;
        }
        
      },

      OpenFormFun(){
        if(this.edit_pwd === false){
          this.edit_pwd = true;
        }else{
          this.$refs['editform'].resetFields()
          this.edit_pwd = false;
        }
      },

      Cancel(){
        this.$refs['editform'].resetFields()
        this.edit_pwd = false;
      },

      RemoveData(){
        this.$refs['editform'].resetFields()
        this.error_flag = false;
      }

    },
  }
</script>
