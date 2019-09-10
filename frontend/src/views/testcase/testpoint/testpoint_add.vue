<template>
  <div v-if="add_visible" class="lg">
    <el-dialog
      title="添加测试点"
      width="30%"
      center
      :show-close = "false"
      :modal-append-to-body="false"
      @closed="Closeed"
      :visible="true">

      <el-form ref="AddPointFrom" :model="AddPointFrom" :rules='addrules' label-width="80px">

        <el-form-item label="日 期" prop="t_date">
          <el-date-picker type="datetime"
                          style="width: 100%;"
                          placeholder="选择日期"
                           v-model="AddPointFrom.t_date"></el-date-picker>
        </el-form-item>

        <el-form-item label="提 交 人" prop="t_user">
          <el-input type="text" placeholder="请输入提交人信息" v-model="AddPointFrom.t_user"></el-input>
        </el-form-item>

        <el-form-item label="版本模块" prop="t_info">
          <el-cascader
            expand-trigger="hover"
            :options="options"
            separator="-"
            v-model="AddPointFrom.t_info"
          >
          </el-cascader>
        </el-form-item>

        <el-form-item label="测试点" prop="t_content">
          <el-input type="text" placeholder="请输入测试点" v-model="AddPointFrom.t_content"></el-input>
        </el-form-item>



<!--        <el-form-item label="上传图片" prop="t_imgname">-->
<!--          <el-upload-->
<!--                  class="fileBtn"-->
<!--                  action="https://jsonplaceholder.typicode.com/posts/"-->
<!--                  name="t_imgname"-->
<!--                  accept="image/*"-->
<!--                  :on-preview="handlePreview"-->
<!--                  :on-remove="handleRemove"-->
<!--                  :on-success="getAvatarSuccess"-->
<!--                  :file-list="fileList"-->
<!--                  list-type="picture">-->
<!--            <el-button size="small" type="primary">点击上传</el-button>-->
<!--            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
<!--          </el-upload>-->
<!--          <el-upload-->
<!--            class="avatar-uploader"-->
<!--            action="https://jsonplaceholder.typicode.com/posts/"-->
<!--            :show-file-list="false"-->
<!--            :on-success="handleAvatarSuccess"-->
<!--            :before-upload="beforeAvatarUpload">-->
<!--            <img v-if="imageUrl" :src="imageUrl" class="avatar">-->
<!--            <i v-else class="el-icon-plus avatar-uploader-icon"></i>-->
<!--          </el-upload>-->
<!--          <el-input type="text" placeholder="请输入Bug导致的原因-询问开发人员" v-model="AddPointFrom.b_reason"></el-input>-->
<!--        </el-form-item>-->

        <el-form-item label="入库装填" prop="t_storage">
          <el-radio-group v-model="AddPointFrom.t_storage">
            <el-radio border :label="1">未入库</el-radio>
            <el-radio border :label="0">已入库</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="是否失效" prop="t_usable">
          <el-radio-group v-model="AddPointFrom.t_usable">
            <el-radio border :label="1">未失效</el-radio>
            <el-radio border :label="0">已失效</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="影响范围" prop="t_remark">
          <el-input type="textarea" placeholder="请输入该测试点会影响的范围,详细描述清楚-可询问开发人员" v-model="AddPointFrom.t_remark"></el-input>
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
  .el-textarea__inner{
     min-height: 125px;
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

  .avatar-uploader .el-upload {
    border: 2px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: red;
  }
  .avatar-uploader-icon {
    font-size: 22px;
    color: #8c939d;
    width: 88px;
    height: 88px;
    line-height: 88px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>


<script>
    import axios from 'axios'
    export default {
        props:['visible'],
        data() {
            return {
                add_visible: this.visible,
                fileList: [{name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}, {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}],
                re_data: '',

                imageUrl: '',

                r_result: {

                    flag: false,
                },

                AddPointFrom: {
                    t_date: '',
                    t_user: '',
                    t_content: '',
                    t_img: '',
                    t_imgname:"",
                    t_info: [],
                    t_remark: '',
                    t_usable: 1,
                    t_storage: 1,
                },

                // 增加实例规则
                addrules: {
                    t_date: [
                        {
                            required: true, message: '日期不能不选.', trigger: 'blur'
                        },
                    ],

                    t_user: [
                        {
                            required: true, message: '创建人不能为空.', trigger: 'blur'
                        }
                    ],

                    t_info: [
                        {
                            required: true, message: '版本模块不能不选.', trigger: 'blur'
                        }
                    ],

                    t_content: [
                        {
                            required: true, message: '测试点不能为空.', trigger: 'blur'
                        }
                    ],
                },

                // 选择器中bug类型的选项
                options: [
                    {
                    value: '牵手跑胡子',
                    label: '牵手跑胡子',
                    children: [{
                        value: '俱乐部',
                        label: '俱乐部'
                    },{
                        value: '玩法',
                        label: '玩法'
                    },  {
                        value: '其他',
                        label: '其他'
                    }]
                },

                    {
                        value: '牵手湖南麻将',
                        label: '牵手湖南麻将',
                        children: [{
                            value: '俱乐部',
                            label: '俱乐部'
                        }, {
                            value: '玩法',
                            label: '玩法'
                        }, {
                            value: '其他',
                            label: '其他'
                        }]
                    },

                    {
                        value: '牵手跑得快',
                        label: '牵手跑得快',
                        children: [{
                            value: '俱乐部',
                            label: '俱乐部'
                        }, {
                            value: '玩法',
                            label: '玩法'
                        }, {
                            value: '其他',
                            label: '其他'
                        }]
                    },

                    {
                        value: '牵手常德棋牌',
                        label: '牵手常德棋牌',
                        children: [{
                            value: '俱乐部',
                            label: '俱乐部'
                        }, {
                            value: '玩法',
                            label: '玩法'
                        }, {
                            value: '其他',
                            label: '其他'
                        }]
                    },

                    {
                        value: '牵手长沙棋牌',
                        label: '牵手长沙棋牌',
                        children: [{
                            value: '俱乐部',
                            label: '俱乐部'
                        }, {
                            value: '玩法',
                            label: '玩法'
                        }, {
                            value: '其他',
                            label: '其他'
                        }]
                    },

                    {
                        value: '牵手岳阳棋牌',
                        label: '牵手岳阳棋牌',
                        children: [{
                            value: '俱乐部',
                            label: '俱乐部'
                        }, {
                            value: '玩法',
                            label: '玩法'
                        }, {
                            value: '其他',
                            label: '其他'
                        }]
                    },

                    {
                        value: '牵手湖南棋牌',
                        label: '牵手湖南棋牌',
                        children: [{
                            value: '俱乐部',
                            label: '俱乐部'
                        }, {
                            value: '玩法',
                            label: '玩法'
                        },{
                            value: '其他',
                            label: '其他'
                        }]
                    },
                ],

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
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(12222222,this.imageUrl)
            },

          handleRemove(file, fileList) {
            console.log(file, fileList);
          },
          handlePreview(file) {
            console.log("zxcxzczcxz",file);},

          getAvatarSuccess(res,file){
              this.va

          },

            beforeAvatarUpload(file) {
                var img = file.name.substring(file.name.lastIndexOf('.')+1);
                const isJPG = img === 'jpg';
                const isPNG = img === 'png' ;
                const isLt2M = file.size / 1024 / 1024 < 2;

                if (!isJPG && !isPNG ) {
                  this.$message({
                    message: '上传文件只能是 jpg、png格式!',
                    type: 'warning'
                  });
                }

                if (!isLt2M) {
                    this.$message.error('上传头像图片大小不能超过 2MB!');
                }

                return isJPG || isPNG && isLt2M  ;
            },

            Closeed(){
                this.add_visible = false;
            },

            handleClose(done) {
                this.Closeed();
            },

            RemoveData(){
                this.$refs['AddPointFrom'].resetFields()
            },

            Cancel(){
                this.$refs['AddPointFrom'].resetFields()
                this.add_visible = false;
            },

            AddBugs(){
                let that = this;
                // console.log("_version: ", this.AddPointFrom.t_info[0])
                // console.log("_module: ", this.AddPointFrom.t_info[1])

                var _version = this.AddPointFrom.t_info[0];
                var _module = this.AddPointFrom.t_info[1];
                console.log(this.AddPointFrom.t_remark)
                axios({
                    method:'post',
                    url:'/api/knowledge/k_add',

                    data: {
                        t_date: this.AddPointFrom.t_date,
                        t_img: this.AddPointFrom.t_imgname,
                        t_user: this.AddPointFrom.t_user,
                        t_module: _module,
                        t_content: this.AddPointFrom.t_content,
                        t_storage: this.AddPointFrom.t_storage,
                        t_remark: this.AddPointFrom.t_remark,
                        t_usable: this.AddPointFrom.t_usable,
                        t_version: _version
                    }
                }).then(function(resp){
                    that.$refs['AddPointFrom'].resetFields()
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
