<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加知识"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="AddSkillForm" :model="AddSkillForm" :rules='addrules' label-width="80px">

                <el-form-item label="日 期" prop="s_date">
                    <el-date-picker type="datetime" style="width: 100%;" placeholder="选择日期" v-model="AddSkillForm.s_date"></el-date-picker>
                </el-form-item>

                <el-form-item label="标题" prop="s_title">
                    <el-input type="text" placeholder="输入标题" v-model="AddSkillForm.s_title"></el-input>
                </el-form-item>
                <el-form-item label="知识链接" prop="s_link">
                    <el-input type="text" placeholder="输入知识链接" v-model="AddSkillForm.s_link"></el-input>
                </el-form-item>



            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="AddSkill">提 交</el-button>
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
        props:['visible'],
        data() {
            return {
                add_visible: this.visible,

                re_data: '',

                AddSkillForm: {

                    s_date: '',
                    s_name: '',
                    s_title:"",
                    s_link:"",

                },

                // 增加实例规则
                addrules: {
                    s_date: [
                        {
                            required: true, message: '日期不能不选.', trigger: 'blur'
                        },
                    ],

                    s_link: [
                        {
                            required: true, message: '知识链接不能为空.', trigger: 'blur'
                        }
                    ],

                    s_title: [
                        {
                            required: true, message: '标题不能为空.', trigger: 'blur'
                        }
                    ],
                },

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

            RemoveData(){
                this.$refs['AddSkillForm'].resetFields()
            },

            Cancel(){
                this.$refs['AddSkillForm'].resetFields()
                this.add_visible = false;
            },
            Closeed(){
                this.add_visible = false;
            },


            AddSkill(){
                let that = this;
                if(this.$store.state.user != null){
                    if(this.AddSkillForm.s_date == ''){
                        this.$message.error("日期不能为空.")
                        return
                    }

                    if(this.AddSkillForm.s_link == ''){

                        this.$message.error("链接不能为空.")
                        return
                    }
                    if (this.AddSkillForm.s_link.slice(0,5)!="https" && this.AddSkillForm.s_link.slice(0,4)!="http"){
                        this.$message.error("链接添加错误，请添加以http开的网址.")
                        return
                    }

                    if(this.AddSkillForm.s_title == ''){
                        this.$message.error("标题不能为空.")
                        return
                    }
                    console.log()
                    axios({

                        method:'post',
                        url:'/api/knowledge/s_add',
                        data: {
                            t_date: this.AddSkillForm.s_date,
                            t_link: this.AddSkillForm.s_link,
                            t_title: this.AddSkillForm.s_title,
                        }
                    }).then(function(resp){
                        that.$refs['AddSkillForm'].resetFields()
                        that.re_data = resp.data
                        setTimeout(() => {
                            that.$emit("reload")
                        }, 800);
                    }).catch(resp => {
                        that.re_data = resp.data
                    });
                }else{
                    this.$message.error("请先登录")
                }

            },
        },
    }
</script>
