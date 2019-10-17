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

                <el-form-item label="日 期" prop="t_date">
                    <el-date-picker type="datetime"
                                    style="width: 100%;"
                                    placeholder="选择日期"
                                    v-model="editSkillForm.t_date"></el-date-picker>
                </el-form-item>
                <el-form-item label="提 交 人" prop="t_user">
                    <el-input type="text" placeholder="请输入提交人信息" v-model="editSkillForm.t_user"></el-input>
                </el-form-item>
                <el-form-item label="版本模块" prop="t_info">
                    <el-cascader
                            expand-trigger="hover"
                            :options="options"
                            separator="-"
                            v-model="editSkillForm.t_info"
                    >
                    </el-cascader>
                </el-form-item>
                <el-form-item label="测试点" prop="t_content">
                    <el-input type="text" placeholder="请输入测试点" v-model="editSkillForm.t_content"></el-input>
                </el-form-item>
                <el-form-item label="入库装填" prop="t_storage">
                    <el-radio-group v-model="editSkillForm.t_storage">
                        <el-radio border label="未入库">未入库</el-radio>
                        <el-radio border label="已入库">已入库</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否失效" prop="t_usable">
                    <el-radio-group v-model="editSkillForm.t_usable">
                        <el-radio border label="未失效">未失效</el-radio>
                        <el-radio border label="已失效">已失效</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="影响范围" prop="t_remark">
                    <el-input type="textarea" placeholder="请输入该测试点会影响的范围,详细描述清楚-可询问开发人员" v-model="editSkillForm.t_remark"></el-input>
                </el-form-item>
            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>
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
                        value: '牵手益阳棋牌',
                        label: '牵手益阳棋牌',
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
                this.editSkillForm = this.current_data;
                // this.editSkillForm.t_info.push(this.current_data.t_version);
                // this.editSkillForm.t_info.push(this.current_data.t_module);
                console.log();
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
                    url:'/api/knowledge/k_update',
                    data: {
                        data: this.editSkillForm
                    }
                }).then(function(resp){
                    console.log("正常 .", resp);
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
