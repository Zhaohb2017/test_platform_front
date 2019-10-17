<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">
            <el-form ref="editSkillForm" :model="editSkillForm" :rules='addrules' label-width="80px">

                <el-form-item label="版本" prop="c_vsersion">
                    <div>
                        <template>
                            <template>
                                <el-select v-model="editSkillForm.t_versions" placeholder="请选择"  value="">
                                    <el-option
                                            v-for="item in vsersionType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="玩法" prop="c_gameMethod">
                    <el-input type="text" placeholder="请输入什么玩法" v-model="editSkillForm.t_method"></el-input>
                </el-form-item>
                <el-form-item label="牌数据" prop="c_gameCard">
                    <el-input type="text" placeholder="请输入json格式数据" v-model="editSkillForm.t_card"></el-input>
                </el-form-item>
                <el-form-item label="功能" prop="c_remark">
                    <el-input type="text" placeholder="功能介绍" v-model="editSkillForm.t_remark"></el-input>
                </el-form-item>
            </el-form>
            <el-alert v-if="re_data !== ''" type="error">{{ re_data }}</el-alert>
            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="EditTestPoint">提 交</el-button>
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
                    t_info:[],

                },
                vsersionType:[  {text:'牵手跑胡子',value:'牵手跑胡子'},
                    {text:'牵手湖南麻将',value:'牵手湖南麻将'},
                    {text:'牵手长沙棋牌',value:'牵手长沙棋牌'},
                    {text:'牵手岳阳棋牌',value:'牵手岳阳棋牌'},

                ],
                // 增加实例规则
                addrules: {

                    c_gameMethod: [
                        {
                            required: true, message: '玩法不能为空.', trigger: 'blur'
                        }
                    ],
                    c_vsersion: [
                        {
                            required: true, message: '版本不能为空.', trigger: 'blur'
                        }
                    ],

                    c_gameCard: [
                        {
                            required: true, message: '牌数据不能为空', trigger: 'blur'
                        }
                    ],
                },

            };
        },
        mounted() {
            if(this.current_data){
                this.editSkillForm = this.current_data;
                console.log('ffffff',this.editSkillForm);

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
                this.$refs['editSkillForm'].resetFields();
                this.edit_visible = false;
                this.$emit("reload")
            },
            Closeed(){
                this.edit_visible = false;

            },


            EditTestPoint(){
                let that = this;
                axios({
                    method:'post',
                    url:'/api/addcard/update',
                    data: {
                        data: this.editSkillForm
                    }
                }).then(function(resp){
                    that.$refs['editSkillForm'].resetFields();
                    that.re_data = '修改成功.';
                    // that.edit_visible = false;
                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    console.log("失败 .");
                    that.re_data = resp.data
                });
            },
        },
    }
</script>
