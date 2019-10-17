<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加周报 "
                width="80%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-switch
                    class="switch"
                    v-model="addTestReportForm.on"
                    active-color="#13ce66"
                    inactive-color="#ff4949"
                    active-text="功能测试周报"
                    inactive-text="自动化周报"
                    @change="changeSwitch(addTestReportForm.on)">
            </el-switch>

            <el-form ref="addTestReportForm" :model="addTestReportForm" :rules='addrules' label-width="80px">
                <el-form-item label="日 期" prop="testing_time">
                    <div class="block">
                        <el-date-picker
                                v-model="addTestReportForm.testing_time"
                                type="month"
                                placeholder="选择月">
                        </el-date-picker>
                        <template>
                            <el-select v-model="addTestReportForm.week_num" placeholder="请选择周数" value="">
                                <el-option
                                        v-for="item in select_week"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                </el-option>
                            </el-select>
                        </template>
                    </div>
                </el-form-item>

            </el-form>
            <el-form :model="addTestReportForm"
                     ref="addTestReportForm"
                     label-width="80px"
                     center
                     size="small">
            </el-form>
            <el-form :model="addTestReportForm"
                     ref="addTestReportForm"
                     label-width="80px"
                     center
                     v-show="addTestReportForm.on"
                     size="small">
                <el-form-item label="工作内容"  prop="servin" >
                    <el-button type="primary" @click="leftoverProblemAddRow(addTestReportForm.job_content)">新增</el-button>
                    <template>
                        <el-table border :data="addTestReportForm.job_content" style="width: 100%" >

                            <el-table-column prop="user" label="测试人员" width="170" min-width="170">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.user" multiple placeholder="请选择测试人员" collapse-tags value="">
                                        <el-option
                                                v-for="item in select_Users"
                                                :key="item.text"
                                                :label="item.value"
                                                :value="item.value"
                                        >
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="content" label="测试内容">
                                <template slot-scope="scope">

                                    <el-input type="textarea" placeholder="" :autosize="{ minRows: 2, maxRows: 7}" v-model="scope.row.content"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="progress" label="测试进度">
                                <template slot-scope="scope">
                                    <el-input type="textarea" placeholder="" :autosize="{ minRows: 2, maxRows: 7}" v-model="scope.row.progress"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right"  label="操作" width="100" min-width="100">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, addTestReportForm.job_content)" size="small" label-width="80px"> 移除 </el-button>
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
                <el-form-item label="本地bug"  prop="servin" v-show="addTestReportForm.on">
                    <template>
                        <el-table border :data="addTestReportForm.localbugList" style="width: 100%" >
                            <el-table-column  prop="demand_sum" label="需求总数" width="80" min-width="80">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.demand_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_sum" label="本地bug总数" width="90" min-width="90">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="invalidBug_sum" label="本地无效bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.invalidBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="effectivityBug_sum" label="本地有效bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.effectivityBug_sum"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column  prop="ordinaryBug_sum" label="本地一般bug数" width="110" min-width="150">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.ordinaryBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="severityBug_sum" label="本地严重bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.severityBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="deadlyBug_sum" label="本地致命bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.deadlyBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="leaveBug_sum" label="本地历史遗留bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.leaveBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_link" label="本地挂起bug数(附带挂起bug链接)" width="500" min-width="500">
                                <template slot-scope="scope">
                                    <el-input type="textarea" placeholder="" :autosize="{ minRows: 1, maxRows: 3}" v-model="scope.row.bug_link"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>
                <el-form-item label="线上bug"  prop="servin" v-show="addTestReportForm.on">

                    <template>
                        <el-table border :data="addTestReportForm.linebugList" style="width: 100%" >
                            <el-table-column  prop="demand_sum" label="需求总数" width="80" min-width="80">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.demand_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_sum" label="线上bug总数" width="90" min-width="90">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.bug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="invalidBug_sum" label="线上无效bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.invalidBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="effectivityBug_sum" label="线上有效bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.effectivityBug_sum"></el-input>
                                </template>
                            </el-table-column>

                            <el-table-column  prop="ordinaryBug_sum" label="线上一般bug数" width="110" min-width="150">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.ordinaryBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="severityBug_sum" label="线上严重bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.severityBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="deadlyBug_sum" label="线上致命bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.deadlyBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="leaveBug_sum" label="线上历史遗留bug数" width="110" min-width="110">
                                <template slot-scope="scope">
                                    <el-input type="text" placeholder="" v-model="scope.row.leaveBug_sum"></el-input>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="bug_link" label="线上挂起bug数(附带挂起bug链接)" width="500" min-width="500">
                                <template slot-scope="scope">
                                    <el-input type="textarea" placeholder="" :autosize="{ minRows: 1, maxRows: 3}" v-model="scope.row.bug_link"></el-input>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
                </el-form-item>
                <el-form-item label="测试总结" prop="summary" >
                    <el-input type="textarea" placeholder="" :autosize="{ minRows: 4, maxRows: 6}" v-model="addTestReportForm.summary" :rows="2"></el-input>
                </el-form-item>
            </el-form>

            <el-alert v-if="re_data !== ''" type="error">{{ re_data }}</el-alert>
            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="AddWeekly">提 交</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
    .lg{
        text-align: center;
    }
    .switch{
        margin-left: 70%;
        margin-bottom: 3%;
    

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
                type_options:[
                    {text:'本地',value:'本地'},
                    {text:'线上',value:'线上'},

                    ],
                select_Users:[  {text:'郑润生',value:'郑润生'},
                                {text:'王雄',value:'王雄'},
                                {text:'杨佳茵',value:'杨佳茵'},
                                {text:'黄小娇',value:'黄小娇'},
                                {text:'刘金金',value:'刘金金'},
                                {text:'张瑞',value:'张瑞'},
                                {text:'张组立',value:'张组立'},
                                {text:'汪衍',value:'汪衍'},
                            ],
                select_week:[  {label:'第1周',value:'第1周'},
                    {label:'第2周',value:'第2周'},
                    {label:'第3周',value:'第3周'},
                    {label:'第4周',value:'第4周'},
                    {label:'第5周',value:'第5周'},
                ],
                addTestReportForm: {
                    summary:"",                 //测试总结
                    on:true,
                    week_num:null,
                    testing_time:"",            //月
                    job_content:[],
                    account:"",
                    linebugList:[
                        { demand_sum:"",
                        bug_sum:"",
                        invalidBug_sum:"",
                        effectivityBug_sum:"",
                        ordinaryBug_sum:"",
                        severityBug_sum:"",
                        deadlyBug_sum:"",
                        leaveBug_sum:"",
                        bug_link:""}
                        ],          //线上BUG

                    localbugList:[
                        {   demand_sum:"",
                            bug_sum:"",
                            invalidBug_sum:"",
                            effectivityBug_sum:"",
                            ordinaryBug_sum:"",
                            severityBug_sum:"",
                            deadlyBug_sum:"",
                            leaveBug_sum:"",
                            bug_link:""}

                                    ],        //本地BUG



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
            changeSwitch(data){
                console.log('fffff',data);
                console.log('aaaaaaaa',this.addTestReportForm.on);
            },

            AddWeekly(){
                let that = this;
                if(this.$store.state.user != null){
                    if(this.addTestReportForm.testing_time ===""){
                        this.$message.error('请选择日期.');
                        return
                    }
                    if(this.addTestReportForm.summary ===""){
                        this.$message.error('测试总结不能为空.');
                        return
                    }
                    if(this.addTestReportForm.week_num ===null){
                        this.$message.error('请选择周数.');
                        return
                    }

                    this.addTestReportForm["t_date"] = timeFormat(this.addTestReportForm["testing_time"]);
                    this.addTestReportForm["account"] = this.$store.state.user;
                    console.log("ffffffff",this.addTestReportForm);
                    axios({

                        method:'post',
                        url:'/api/testReport/add_weekly',
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
