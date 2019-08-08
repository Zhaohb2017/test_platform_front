<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑知识"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="editSkillForm" :model="editSkillForm" :rules='addrules' label-width="80px">

                <el-form-item label="日 期" prop="t_date">
                    <el-date-picker type="datetime" style="width: 100%;" placeholder="选择日期" v-model="editSkillForm.t_date"></el-date-picker>
                </el-form-item>

                <el-form-item label="标题" prop="t_title">
                    <el-input type="text" placeholder="输入标题" v-model="editSkillForm.t_title"></el-input>
                </el-form-item>
                <el-form-item label="知识链接" prop="t_link">
                    <el-input type="text" placeholder="输入知识链接" v-model="editSkillForm.t_link"></el-input>
                </el-form-item>


            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="EditSkills">提 交</el-button>
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

    // 底部按钮居中
    .el-dialog__footer{
        text-align: center;
    }

    // 按钮样式
    .el-button{
        margin: 0 5%;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
    }
    .el-input-number{

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
                editSkillForm: {
                    t_date: '',
                    t_title:"",
                    t_link:"",
                    t_id:"",

                },
                // 增加实例规则
                addrules: {
                    t_date: [
                        {
                            required: true, message: '日期不能不选.', trigger: 'blur'
                        },
                    ],

                    t_link: [
                        {
                            required: true, message: '知识链接不能为空.', trigger: 'blur'
                        }
                    ],

                    t_title: [
                        {
                            required: true, message: '标题不能为空.', trigger: 'blur'
                        }
                    ],
                },

            };
        },
        mounted() {
            if(this.current_data){
                this.editSkillForm = this.current_data
            }},

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

            RemoveData(){
                this.$refs['editSkillForm'].resetFields()
            },

            Cancel(){
                this.$refs['editSkillForm'].resetFields()
                this.edit_visible = false;
                this.$emit("reload")
            },
            Closeed(){
                this.edit_visible = false;

            },


            EditSkills(){
                let that = this;
                var t_link1 = this.editSkillForm.t_link.indexOf("http");
                var t_link2 = this.editSkillForm.t_link.indexOf("https");
                 if(t_link1!=0 && t_link2!=0){
                     this.$message.error("链接添加错误，请添加以http开的网址.");
                     return
                 }
                axios({
                    method:'post',
                    url:'/api/knowledge/s_edit',
                    data: {
                        t_id: this.editSkillForm.t_id,
                        t_date: this.editSkillForm.t_date,
                        t_link: this.editSkillForm.t_link,
                        t_title: this.editSkillForm.t_title,
                    }
                }).then(function(resp){
                    console.log("正常 .", resp)
                    that.$refs['editSkillForm'].resetFields();
                    that.re_data = '修改成功.';
                    console.log("@@@@@", that.editSkillForm);
                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    console.log("失败 .")
                    that.re_data = resp.data
                });
            },
        },
    }
</script>
