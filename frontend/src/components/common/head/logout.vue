<template>
    <div v-if="logout_visible" >
      <el-dialog 
      width="25%" 
      center
      :show-close = "false"
      @closed="Closeed" 
      :visible="true">
        <h4>确定退出么？</h4>
        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="logout_visible = false">取 消</el-button>
          <el-button type="primary" @click="Exit">退出</el-button>
        </span>
      </el-dialog>
    </div>
</template>

<style lang="less" scoped>
.el-dialog--center .el-dialog__body{
  text-align: center;
  font-size: 16px;
  color: #222831;
}

h4{
  text-align: center;
}

.dialog-footer{
  margin-left: 2% !important;
}

</style>


<script>
import axios from 'axios'
  export default {
    props:['visible'],
    data() {
      return {
        logout_visible: this.visible,
      };
    },

    watch:{
      visible(val){
        this.logout_visible = val
      },

      logout_visible(val){
        this.$emit('update:visible', val)
      }
    },

    methods: {
      Closeed(){
        this.logout_visible = false;
      },

      handleClose(done) {
        this.Closeed();
      },

      Exit(){
        let that = this;
        axios({
            method:'post',
            url:'/api/logout',
            data: {
                // username: this.loginform.username,
                // pwd: this.loginform.pwd,
            }
           }).then(function(resp){
              that.logout_visible = false
              that.$message.success(resp.data)
              that.$store.commit("$_removeStorage")
           }).catch(resp => {
              that.$message.success(resp.data)
           });
      }
    },
  }
</script>