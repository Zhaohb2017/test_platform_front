<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑测试用例"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">
            <el-form ref="editDataForm" :model="editDataForm"  label-width="80px">
                <el-form-item label="版本" prop="s_versions">
                    <el-select v-model="editDataForm.s_versions" filterable placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="模块" prop="s_module" >
                    <el-input type="text" placeholder="" v-model="editDataForm.s_module"></el-input>
                </el-form-item>
                <el-form-item label="测试点" prop="testpoint_value">
                    <el-input type="text" placeholder="" v-model="editDataForm.testpoint_value" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="前提条件" prop="s_precondition">
                    <el-input type="text" placeholder="" v-model="editDataForm.s_precondition"></el-input>
                </el-form-item>
                <el-form-item label="操作步骤" prop="s_step">
                    <el-input type="text" placeholder="" v-model="editDataForm.s_step"></el-input>
                </el-form-item>
                <el-form-item label="预期结果" prop="s_expectedResult">
                    <el-input type="text" placeholder="" v-model="editDataForm.s_expectedResult"></el-input>
                </el-form-item>
                <el-form-item label="实际结果" prop="s_actualResults">
                    <el-input type="text" placeholder="" v-model="editDataForm.s_actualResults"></el-input>
                </el-form-item>
                <el-form-item label="是否通过" prop="s_pass">
                    <template>
                        <el-select v-model="editDataForm.s_pass" placeholder="请选择">
                            <el-option
                                    v-for="item in options_whether"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="是否有效" prop="s_effective">
                    <template>
                        <el-select v-model="editDataForm.s_effective" placeholder="请选择">
                            <el-option
                                    v-for="item in options_whether"
                                    :key="item.label"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="备注" prop="s_remark">
                    <el-input type="text" placeholder="" v-model="editDataForm.s_remark"></el-input>
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
                options_whether:[
                    {
                        value: 'yes',
                        label: '是',
                    },

                    {
                        value: 'no',
                        label: '否',
                    },
                ],
                options: [
                    {
                        value: '牵手跑胡子',
                        label: '牵手跑胡子',
                    },

                    {
                        value: '牵手湖南麻将',
                        label: '牵手湖南麻将',
                    },

                    {
                        value: '牵手跑得快',
                        label: '牵手跑得快',

                    },

                    {
                        value: '牵手常德棋牌',
                        label: '牵手常德棋牌',

                    },

                    {
                        value: '牵手长沙棋牌',
                        label: '牵手长沙棋牌',

                    },

                    {
                        value: '牵手岳阳棋牌',
                        label: '牵手岳阳棋牌',

                    },

                    {
                        value: '牵手湖南棋牌',
                        label: '牵手湖南棋牌',

                    },
                ],
                editDataForm: {
                    id:"",
                    testpoint_value:"",
                    s_precondition: '',  //前置条件
                    s_step: '',
                    s_expectedResult:"",
                    s_testpoint:"",
                    s_versions:"",
                    s_module:"",
                    s_actualResults:"",
                    s_pass:"",        //通过
                    s_effective:"",  //有效
                    s_remark:"",    //备注
                },
            };
        },

        mounted() {
            if(this.current_data){
                this.editDataForm.id = this.current_data.t_id;
                this.editDataForm.testpoint_value = this.current_data.t_testpointVal;
                this.editDataForm.s_precondition = this.current_data.t_precondition;
                this.editDataForm.s_step = this.current_data.t_step;
                this.editDataForm.s_expectedResult = this.current_data.t_expectedResult;
                this.editDataForm.s_testpoint = this.current_data.t_testpoint;
                this.editDataForm.s_versions = this.current_data.t_versions;
                this.editDataForm.s_module = this.current_data.t_module;
                this.editDataForm.s_actualResults = this.current_data.t_actualResults;
                this.editDataForm.s_pass = this.current_data.t_pass;
                this.editDataForm.s_effective = this.current_data.t_effective;
                this.editDataForm.s_remark = this.current_data.t_remark;
            }},

        // 监听弹窗可视
        watch:{
            visible(val){
                this.edit_visible = val;
                console.log("监听弹窗可看: "+this.edit_visible );
            },
            edit_visible(val){
                this.$emit('update:visible', val)
            }
        },

        methods: {

            RemoveData(){
                this.$refs['editDataForm'].resetFields()
            },

            Cancel(){
                this.$refs['editDataForm'].resetFields();
                this.edit_visible = false;
                this.$emit("reload")
            },
            Closeed(){
                this.edit_visible = false;

            },


            EditSkills(){
                let that = this;

                axios({
                    method:'post',
                    url:'/api/knowledge/case_update',
                    data: {
                        data: this.editDataForm
                    }
                }).then(function(resp){
                    that.$refs['editDataForm'].resetFields();
                    that.re_data = resp.data;
                    alert(resp.data);
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
