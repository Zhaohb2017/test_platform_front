<template>
    <div v-if="edit_visible" class="lg">
      <el-dialog 
      title="编辑Bug实例" 
      width="30%" 
      center
      :show-close = "false"
      :modal-append-to-body="false"
      @closed="Closeed" 
      :visible="true">
        
        <el-form ref="editBugForm" :model="editBugForm" label-width="80px">
           <el-table-column prop="b_id" v-if="false">
            </el-table-column>

          <el-form-item label="日 期" prop="b_date">
            <el-date-picker type="text" style="width: 100%;" disabled placeholder="选择日期" v-model="editBugForm.b_date"></el-date-picker>
          </el-form-item>

          <el-form-item label="提 交 人" prop="b_name">
            <el-input type="text" placeholder="请输入提交人信息" disabled v-model="editBugForm.b_name"></el-input>
          </el-form-item>

          <el-form-item label="Bug类别" prop="b_type">
            <el-input type="text" placeholder="选择bug类别" disabled v-model="editBugForm.b_type"></el-input>
          </el-form-item>

          <el-form-item label="直接结果" prop="b_result">
            <el-input type="text" placeholder="请输入直接结果" v-model="editBugForm.b_result"></el-input>
          </el-form-item>


          <el-form-item label="原 因" prop="b_reason">
            <el-input type="text" placeholder="请输入Bug导致的原因-询问开发人员" v-model="editBugForm.b_reason"></el-input>
          </el-form-item>

          <el-form-item label="是否解决" prop="b_solve">
              <el-radio-group v-model="editBugForm.b_solve">
                <el-radio border :label="1">已解决</el-radio>
                <el-radio border :label="0">未解决</el-radio>
            </el-radio-group>
            <!-- <el-input type="text" placeholder="选择是否解决" v-model="editBugForm.b_solve"></el-input> -->
          </el-form-item>
        </el-form>
        <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="EditBugs">提 交</el-button>
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

.el-cascader{
    width: 100%;
}

//  弹窗样式
.el-dialog__wrapper{
  margin-top: 5vh;
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
    props:['visible', 'current_data'],
    data() {
      return {
        edit_visible: this.visible,
        re_data: '',
        
        editBugForm: {
          b_id: '',
          b_date: '',
          b_name: '',
          b_reason: '',
          b_result: '',
          b_solve: 1,
          b_type: [],
        },

      };
    },

    mounted() {
        if(this.current_data){
            this.editBugForm = this.current_data
        }
    },

    // 监听弹窗可视
    watch:{
      visible(val){
        this.edit_visible = val
      },
      edit_visible(val){
        this.$emit('update:visible', val)
      }
    },

    methods: {
      Closeed(){
        this.edit_visible = false;
      },

      handleClose(done) {
        this.Closeed();
      },
    
      RemoveData(){
          this.$refs['editBugForm'].resetFields()
      },

      Cancel(){
        this.$refs['editBugForm'].resetFields()
        this.edit_visible = false;

        console.log("state: %s", this.edit_visible)
      },
    
      EditBugs(){
          let that = this;
          axios({
              method:'post',
              url:'/api/bugs/b_edit',
              data: {
                  b_id: this.editBugForm.b_id,
                  b_date: this.editBugForm.b_date,
                  b_name: this.editBugForm.b_name,
                  b_type: this.editBugForm.b_type,
                  b_result: this.editBugForm.b_result,
                  b_reason: this.editBugForm.b_reason,
                  b_solve: this.editBugForm.b_solve
              }
           }).then(function(resp){
                that.$refs['editBugForm'].resetFields()
                that.re_data = '修改成功.'
                setTimeout(() => {
                    that.$emit("reload")
                }, 800);
           }).catch(resp => {
                that.re_data = resp.data
           });
      },

      
    },
  }
</script>
