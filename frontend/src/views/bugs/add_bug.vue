<template>
    <div v-if="add_visible" class="lg">
      <el-dialog 
      title="添加Bug实例" 
      width="30%" 
      center
      :show-close = "false"
      :modal-append-to-body="false"
      @closed="Closeed" 
      :visible="true">
        
        <el-form ref="addBugForm" :model="addBugForm" :rules='addrules' label-width="80px">
          
          <el-form-item label="日 期" prop="b_date">
            <el-date-picker type="date" style="width: 100%;" placeholder="选择日期" v-model="addBugForm.b_date"></el-date-picker>
          </el-form-item>

          <el-form-item label="提 交 人" prop="b_name">
            <el-input type="text" placeholder="请输入提交人信息" v-model="addBugForm.b_name"></el-input>
          </el-form-item>

          <el-form-item label="Bug类别" prop="b_type">
              <el-cascader
                expand-trigger="hover"
                :options="options"
                separator="-"
                v-model="addBugForm.b_type"
                >
            </el-cascader>
            <!-- <el-input type="text" placeholder="选择bug类别" v-model="addBugForm.b_type"></el-input> -->
          </el-form-item>

          <el-form-item label="直接结果" prop="b_result">
            <el-input type="text" placeholder="请输入直接结果" v-model="addBugForm.b_result"></el-input>
          </el-form-item>


          <el-form-item label="原 因" prop="b_reason">
            <el-input type="text" placeholder="请输入Bug导致的原因-询问开发人员" v-model="addBugForm.b_reason"></el-input>
          </el-form-item>

          <el-form-item label="是否解决" prop="b_solve">
              <el-radio-group v-model="addBugForm.b_solve">
                <el-radio border :label="1">已解决</el-radio>
                <el-radio border :label="0">未解决</el-radio>
            </el-radio-group>
            <!-- <el-input type="text" placeholder="选择是否解决" v-model="addBugForm.b_solve"></el-input> -->
          </el-form-item>
        </el-form>
        <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

        <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="AddBugs">提 交</el-button>
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
    props:['visible'],
    data() {
      return {
        add_visible: this.visible,

        re_data: '',


        r_result: {
            
            flag: false,
        },
        
        addBugForm: {
          b_date: '',
          b_name: '',
          b_reason: '',
          b_result: '',
          b_solve: 0,
          b_type: [],
        },

        // 增加实例规则
        addrules: {
            b_date: [
                {
                required: true, message: '日期不能不选.', trigger: 'blur'
                },
            ],

            b_name: [
                {
                required: true, message: '提交人不能为空.', trigger: 'blur'
                }
            ],

            b_type: [
                {
                required: true, message: 'Bug类型不能不选.', trigger: 'blur'
                }
            ],

            b_result: [
                {
                required: true, message: 'Bug直接导致结果不能为空.', trigger: 'blur'
                }
            ],
        },

        // 选择器中bug类型的选项
        options: [{
          value: '线上',
          label: '线上',
          children: [{
            value: '活动Bug',
            label: '活动Bug'
          }, {
            value: '玩法Bug',
            label: '玩法Bug'
          }, {
            value: '俱乐部管理Bug',
            label: '俱乐部管理Bug'
          },{
            value: '充值Bug',
            label: '充值Bug'
          }, {
            value: '分享Bug',
            label: '分享Bug'
          }, {
            value: '显示Bug',
            label: '显示Bug'
          }, {
            value: '第三方Bug',
            label: '第三方Bug'
          }, {
            value: '后台Bug',
            label: '后台Bug'
          }]
        },
        {
          value: '测试服',
          label: '测试服',
          children: [{
            value: '活动Bug',
            label: '活动Bug'
          }, {
            value: '玩法Bug',
            label: '玩法Bug'
          }, {
            value: '俱乐部管理Bug',
            label: '俱乐部管理Bug'
          },{
            value: '充值Bug',
            label: '充值Bug'
          }, {
            value: '分享Bug',
            label: '分享Bug'
          }, {
            value: '显示Bug',
            label: '显示Bug'
          }, {
            value: '第三方Bug',
            label: '第三方Bug'
          }, {
            value: '后台Bug',
            label: '后台Bug'
          }]
        }
        , {
          value: '本地',
          label: '本地',
          children: [{
            value: '活动Bug',
            label: '活动Bug'
          }, {
            value: '玩法Bug',
            label: '玩法Bug'
          },{
            value: '俱乐部管理Bug',
            label: '俱乐部管理Bug'
          },{
            value: '充值Bug',
            label: '充值Bug'
          }, {
            value: '分享Bug',
            label: '分享Bug'
          }, {
            value: '显示Bug',
            label: '显示Bug'
          }, {
            value: '第三方Bug',
            label: '第三方Bug'
          }, {
            value: '后台Bug',
            label: '后台Bug'
          }]
        }],

      };
    },

    // 监听弹窗可视
    watch:{
      visible(val){
        this.add_visible = val
      },
      add_visible(val){
        this.$emit('update:visible', val)
      }
    },

    methods: {
      Closeed(){
        this.add_visible = false;
      },

      handleClose(done) {
        this.Closeed();
      },
    
      RemoveData(){
          this.$refs['addBugForm'].resetFields()
      },

      Cancel(){
        this.$refs['addBugForm'].resetFields()
        this.add_visible = false;
      },
    
      AddBugs(){
          let that = this;
          axios({
              method:'post',
              url:'/api/bugs/b_add',
              data: {
                  b_date: this.addBugForm.b_date,
                  b_name: this.addBugForm.b_name,
                  b_type: (this.addBugForm.b_type)[0] + '-' + (this.addBugForm.b_type)[1],
                  b_result: this.addBugForm.b_result,
                  b_reason: this.addBugForm.b_reason,
                  b_solve: this.addBugForm.b_solve
              }
           }).then(function(resp){
                that.$refs['addBugForm'].resetFields()
                that.re_data = resp.data
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
