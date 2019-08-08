<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加用例"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="AddDataForm" :model="AddDataForm" :rules='addrules' label-width="80px">
                <el-form-item label="版本" prop="s_versions">
                    <el-select v-model="AddDataForm.s_versions" filterable placeholder="请选择">
                        <el-option
                                v-for="item in options"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="模块" prop="s_module" >
                    <el-input type="text" placeholder="" v-model="AddDataForm.s_module"></el-input>
                </el-form-item>

                <el-form-item label="测试点" prop="s_testpoint">
                    <el-select v-model="AddDataForm.testpoint_value" filterable placeholder="请选择">
                        <el-option
                                v-for="item in testpoint"
                                :key="item.label"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="前提条件" prop="s_precondition">
                    <el-input type="text" placeholder="" v-model="AddDataForm.s_precondition"></el-input>
                </el-form-item>
                <el-form-item label="操作步骤" prop="s_step">
                    <el-input type="text" placeholder="" v-model="AddDataForm.s_step"></el-input>
                </el-form-item>
                <el-form-item label="预期结果" prop="s_expectedResult">
                    <el-input type="text" placeholder="" v-model="AddDataForm.s_expectedResult"></el-input>
                </el-form-item>
                <el-form-item label="实际结果" prop="s_actualResults">
                    <el-input type="text" placeholder="" v-model="AddDataForm.s_actualResults"></el-input>
                </el-form-item>
                <el-form-item label="是否通过" prop="s_pass">
                    <template>
                        <el-select v-model="AddDataForm.s_pass" placeholder="请选择">
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
                        <el-select v-model="AddDataForm.s_effective" placeholder="请选择">
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
                    <el-input type="text" placeholder="" v-model="AddDataForm.s_remark"></el-input>
                </el-form-item>

            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="AddCase">提 交</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
    .el-form-item__label{
        text-align:right;
    }

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
                null_list:[],
                re_data: '',
                caseData:[], //测试点数据
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
                testpoint:[],
                value_1:"",
                value_2:"",
                AddDataForm: {
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

                // 增加实例规则
                addrules: {
                    s_step: [
                        {
                            required: true, message: '操作步骤不能为空.', trigger: 'blur'
                        },
                    ],
                    s_module: [
                        {
                            required: true, message: '模块不能为空.', trigger: 'blur'
                        },
                    ],

                    s_versions: [
                        {
                            required: true, message: '请选择版本.', trigger: 'blur'
                        },
                    ],

                    s_testpoint: [
                        {
                            required: true, message: '测试点不能为空.', trigger: 'blur'
                        }
                    ],

                    s_expectedResult: [
                        {
                            required: true, message: '预期结果不能为空.', trigger: 'blur'
                        }
                    ],
                },

            };
        },
        mounted: function(){
            this.GetTestPoint();
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
                this.$refs['AddDataForm'].resetFields()
            },

            Cancel(){
                this.$refs['AddDataForm'].resetFields()
                this.add_visible = false;
            },
            Closeed(){
                this.add_visible = false;
            },

            // get测试点
            GetTestPoint(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/knowledge/k_list',
                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    var jsonData = JSON.parse(JSON.stringify(that.caseData));
                    for( var item in jsonData){
                        console.log(jsonData[item]["t_content"]);
                        var obj = {};
                        obj["value"] = jsonData[item]["t_content"];
                        obj["label"] = jsonData[item]["t_content"];
                        that.testpoint.push(obj);
                    }
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },
            AddCase(){
                let that = this;
                console.log(11111111,that.testpoint);
                    axios({

                        method:'post',
                        url:'/api/knowledge/add_case',
                        data: {
                            s_versions: this.AddDataForm.s_versions,
                            s_module: this.AddDataForm.s_module,
                            s_testpointVal : this.AddDataForm.testpoint_value,
                            s_precondition: this.AddDataForm.s_precondition,
                            s_step:this.AddDataForm.s_step,
                            s_expectedResult: this.AddDataForm.s_expectedResult,
                            s_actualResults: this.AddDataForm.s_actualResults,
                            s_pass: this.AddDataForm.s_pass,
                            s_effective:this.AddDataForm.s_effective,
                            s_remark:this.AddDataForm.s_remark,
                        }
                    }).then(function(resp){
                        that.$refs['AddDataForm'].resetFields();
                        // that.re_data = resp.data;
                        alert(resp.data);
                        setTimeout(() => {
                            that.$emit("reload")
                        }, 800);
                    }).catch(resp => {
                        that.re_data = resp.data
                    });

            }


        },
    }
</script>
