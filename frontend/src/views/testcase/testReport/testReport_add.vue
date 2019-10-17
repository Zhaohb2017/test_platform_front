<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加测试报告 "
                width="70%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="addTestReportForm" :model="addTestReportForm" :rules='addrules' label-width="80px">
                <el-form-item label="日 期" prop="testing_time">
                    <el-date-picker type="datetime" style="width: 100%;" placeholder="选择日期" v-model="addTestReportForm.testing_time"></el-date-picker>
                </el-form-item>

                <el-form-item label="版本名称" prop="version_name">
                    <template>
                        <el-select v-model="addTestReportForm.version_name" placeholder="请选择版本" style="width: 100%;">
                            <el-option
                                    v-for="item in vsersionType"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>

                <el-form-item label="测试阶段" prop="testing_phase">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.testing_phase"></el-input>
                </el-form-item>
                <el-form-item label="版本说明" prop="release_note">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.release_note"></el-input>
                </el-form-item>
                <el-form-item label="测试说明" prop="testing_note">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.testing_note"></el-input>
                </el-form-item>
                <el-form-item label="准出标准" prop="testing_standard">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.testing_standard"></el-input>
                </el-form-item>
                <el-form-item label="测试人员" prop="tester">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.tester"></el-input>
                </el-form-item>
                <el-form-item label="测试结果" prop="test_result">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.test_result"></el-input>
                </el-form-item>
                <el-form-item label="测试项" prop="testing_items">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.testing_items"></el-input>
                </el-form-item>
                <el-form-item label="延期说明" prop="delay_note">
                    <el-input type="text" placeholder="" v-model="addTestReportForm.delay_note"></el-input>
                </el-form-item>

            </el-form>
            <el-form :model="addTestReportForm"
                     ref="addTestReportForm"
                     label-width="80px"
                     center
                     size="small">
                <el-form-item label="BUG汇总"  prop="servin" >
<!--                    <el-button type="primary" @click="bugAddRow(addTestReportForm.bug)">新增</el-button>-->
                    <template>
                        <el-table border :data="addTestReportForm.bug" style="width: 100%" >
                            <el-table-column prop="bug_sum" label="bug总数" style="width:6vw;" >
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_severity" label="严重bug（个）">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_severity"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_general" label="一般bug（个）">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_general"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_low" label="低级bug（个）">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_low"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_mount" label="挂起bug（个）">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_mount"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="remark" label="备注">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.remark"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>
            </el-form>
            <el-form :model="addTestReportForm"
                     ref="addTestReportForm"
                     label-width="80px"
                     center
                     size="small">
                <el-form-item label="遗留问题"  prop="servin" >
                    <el-button type="primary" @click="leftoverProblemAddRow(addTestReportForm.leftoverProblemList)">新增</el-button>
                    <template>
                        <el-table border :data="addTestReportForm.leftoverProblemList" style="width: 100%" >

                            <el-table-column prop="problem_description" label="问题描述" style="width:6vw;" >
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.problem_description"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="cause" label="准出原因">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.cause"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="Severity" label="严重程度">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.Severity"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="Responsible" label="责任人">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.Responsible"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="address" label="禅道地址">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.address"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right"  label="操作">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, leftoverProblemList)" size="small"> 移除 </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>
            </el-form>
            <el-form :model="addTestReportForm"
                     ref="addTestReportForm"
                     label-width="80px"
                     center
                     size="small">
                <el-form-item label="风险"  prop="servin" >
                    <el-button type="primary" @click="riskAddRow(addTestReportForm.riskList)">新增</el-button>
                    <template>
                        <el-table border :data="addTestReportForm.riskList" style="width: 100%" >
                            <el-table-column prop="description" label="风险描述" style="width:6vw;" >
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.description"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="level" label="风险级别">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.level"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="countermeasures" label="应对措施">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.countermeasures"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="Responsible" label="负责人">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.Responsible"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="remark" label="备注">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.remark"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right"  label="操作">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, riskList)" size="small"> 移除 </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
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
    import {timeFormat} from '../../../../libs/time.js'
    import axios from 'axios'
    export default {
        props:['visible'],
        data() {
            return {
                add_visible: this.visible,

                re_data: '',
                vsersionType:[
                    {text:'牵手跑胡子',value:'牵手跑胡子'},
                    {text:'牵手湖南麻将',value:'牵手湖南麻将'},
                    {text:'牵手常德棋牌',value:'牵手常德棋牌'},
                    {text:'牵手长沙棋牌',value:'牵手长沙棋牌'},
                    {text:'牵手益阳棋牌',value:'牵手益阳棋牌'},

                    ],
                addTestReportForm: {
                    version_name:"",
                    testing_time: '',
                    testing_phase:"",                       // 测试阶段
                    release_note:"",                     //版本说明
                    testing_note:"",                    //测试说明
                    testing_standard:"",                //准出标准
                    tester:"",                      //测试人员
                    test_result:"",                 //测试结果
                    testing_items:"",              //测试项
                    delay_note:"",                //延期说明
                    bug:[{bug_sum: 0,bug_severity:0, bug_general:0,bug_low:0,bug_mount:0,remark:""}],
                    leftoverProblemList:[],
                    riskList:[],

                },

                // 增加实例规则
                addrules: {
                    testing_time: [
                        {
                            required: true, message: '日期不能不选.', trigger: 'blur'
                        },
                    ],

                    testing_phase: [
                        {
                            required: true, message: '测试阶段不能为空.', trigger: 'blur'
                        }
                    ],

                    version_name: [
                        {
                            required: true, message: '版本名称不能为空.', trigger: 'blur'
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
                this.$refs['addTestReportForm'].resetFields()
            },

            Cancel(){
                this.$refs['addTestReportForm'].resetFields()
                this.add_visible = false;
            },
            Closeed(){
                this.add_visible = false;
            },
            deleteRow(index, rows){
                ////删除改行
                rows.splice(index, 1);
            },

            leftoverProblemAddRow(tableData,event){
                tableData.push({problem_description: '',cause:'', Severity:'',Responsible:"",address:""})

            },
            riskAddRow(tableData,event){
                tableData.push({description: '',level:'', countermeasures:'',Responsible:"",remark:""})
            },


            AddSkill(){
                let that = this;
                if(this.$store.state.user != null){
                    if(this.addTestReportForm.testing_time ==""){
                        this.$message.error('请选择日期.');
                        return
                    }
                    if(this.addTestReportForm.version_name ==""){
                        this.$message.error('请选择版本名称.');
                        return
                    }
                    if(this.addTestReportForm.testing_phase ==""){
                        this.$message.error('请输入测试阶段.');
                        return
                    }




                    this.addTestReportForm["t_date"] = timeFormat(this.addTestReportForm["testing_time"]);
                    axios({

                        method:'post',
                        url:'/api/testReport/t_add',
                        data: {
                            data: this.addTestReportForm,

                        }
                    }).then(function(resp){
                        that.$refs['addTestReportForm'].resetFields();
                        that.re_data = resp.data;
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
