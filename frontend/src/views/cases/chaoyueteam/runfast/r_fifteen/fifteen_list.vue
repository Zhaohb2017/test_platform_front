<template>
    <div class="bugs">
        <!-- 添加、搜索功能 -->
        <div class="head" id="title">
            <h3>跑得快15张</h3>
            <div class="head_fun">
                <el-button type="danger" @click="getBugsList">刷新数据</el-button>
                <el-button type="danger" @click="ChangeAddFlag" >添加测试用例</el-button>
                <el-select v-model="selected_item" multiple placeholder="请选择提交人" collapse-tags>
                    <el-option
                            v-for="item in select_option"
                            :key="item.name"
                            :label="item.value"
                            :value="item.value"
                    >
                    </el-option>
                </el-select>
                <el-button type="primary" @click="Search" >搜索</el-button>
                <AddBugs :visible.sync="show_flag" v-if="show_flag" @reload="reload"></AddBugs>
            </div>
        </div>
        <!-- 展示列表 -->
        <el-table
                :data="showcaseData"
                style="width: 100%"
                border
                :row-class-name="tableRowClassName"
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'c_date', order: 'ascending'}">
            <el-table-column prop="c_id" v-if="false">
            </el-table-column>

            <el-table-column prop="c_project" v-if="false">
            </el-table-column>

            <el-table-column prop="c_play" v-if="false">
            </el-table-column>

            <el-table-column prop="c_is_local" v-if="false">
            </el-table-column>

            <el-table-column prop="c_file_name" v-if="false">
            </el-table-column>

            <el-table-column label="日期" width="110" prop="show_date" sortable header-align="center" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.show_time}}</span>
                    <!--                    scope.row.c_date-->
                </template>
            </el-table-column>

            <el-table-column label="提交人" width="100" prop="c_name" header-align="center" align="center">
            </el-table-column>

            <el-table-column label="用戶mid" width="100" prop="c_user" header-align="center" align="center">
                <template slot-scope="scope">
                    <p v-for="item in scope.row.c_user" style="margin:0; text-align:justify;">{{item.name}}: {{item.value}}</p>
                </template>
            </el-table-column>

            <el-table-column label="测试目的" width="190" header-align="center" align="center" prop="c_purpose">
            </el-table-column>

            <el-table-column label="创房选项" width="290" min-width="180" header-align="center" prop="c_RoomOptions">
                <template slot-scope="scope">
                    <p v-for="item in scope.row.c_RoomOptions" style="margin:0; text-align:justify;">{{item.name}}：{{item.value}}</p>
                </template>
            </el-table-column>

            <el-table-column label="做牌数据" width="290" min-width="180" header-align="center" prop="c_cards">
            </el-table-column>

            <el-table-column label="操作步骤" width="290" min-width="180" header-align="center" prop="c_step">
                <template slot-scope="scope">
                    <p v-for="item in scope.row.c_step" style="margin:0; text-align:justify;">{{item.users}}：{{item.operation}}-->{{item.card}}</p>
                </template>
            </el-table-column>

            <el-table-column label="备注" width="130" align="center" prop="c_remake">
            </el-table-column>

            <el-table-column header-align="center" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="text" @click="ChangeEditFlag(scope.row)">编辑</el-button>
                    <el-button size="mini" type="text" :disabled="scope.row.c_status == 1" @click="RunCase(scope.$index, scope.row)">运行</el-button>
                    <el-button size="mini" type="text" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    <el-button size="mini" type="text" @click="ReadReports(scope.$index, scope.row)">查看报告</el-button>
                </template>
            </el-table-column>


        </el-table>

        <!-- 分页 -->
        <div class="block">
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="page_sizes_data"
                    :page-size="current_page_size"
                    background
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="caseData.length">
            </el-pagination>
        </div>

        <EditBugs :visible.sync="edit_show_flag" v-if="edit_show_flag" :current_data="current_data" @reload="reload"></EditBugs>

        <Reports :visible.sync="report_show_flag" v-if="report_show_flag" :report_current_data="report_current_data" @reload="reload" ></Reports>

    </div>
</template>

<style lang="less" scoped>
    .bugs{
        margin: 1%;
        top: 0;
    }

    h3{
        float: left;
    }

    .head{
        float: left;
    }

    .head_fun{
        margin-top: 10%;
        float: left;
        margin-left: -16%;
        margin-bottom: 3%;
    }

    .cell{
        text-align: center;
        white-space: pre-line;
    }

    .el-tag{
        border: none;
        background-color:transparent;
    }

    .el-table{
        text-align: center;
    }

    .el-table .success-row {
        background: #f0f9eb;
    }

    .block{
        margin-top: 1%;
        text-align: center;
    }

    // bug类别说明样式
    .explain{
        font-size: 16px;
        float: left;
        text-align: center;
    }
    .tips{
        margin-top: 2%;
        float: left;
        font-size: 18px;
        font-weight: 600;
    }
</style>

<script>
    import axios from 'axios'
    import AddBugs from './add_runfastFifteen'
    import EditBugs from './edit'
    import Reports from '../../../../reports/report'
    import {timeFormat,roomDataFormat,midFormat,remove} from '../../../../../../libs/time.js'
    import { truncate } from 'fs';
    import { start } from 'repl';

    export default {
        components:{
            AddBugs,
            EditBugs,
            Reports,
        },

        data() {
            return {
                show_flag: false,
                edit_show_flag: false,
                report_show_flag: false,

                // 编辑子组件传递数据类型
                current_data:{},

                // 报告数据
                report_current_data: [],

                //  页面页数选择
                page_sizes_data: [5, 10],
                // 当前页面
                currentPage: 1,
                // 当前页面展示数据
                current_page_size: 5,

                // 服务端返回所有数据
                caseData: [],

                // table展示数据
                showcaseData: [],

                // 当前初始的index
                start_index: 0,

                // 结束展示的index
                end_index: 0,

                select_option: [],
                selected_item: [],

            }
        },

        mounted: function(){
            this.getBugsList();
        },

        methods: {
            reload(){
                if(this.edit_show_flag == true){
                    console.log("编辑组件调用了刷新")
                    this.edit_show_flag = false;
                }
                if(this.show_flag == true){
                    console.log("添加组件调用了刷新")
                    this.show_flag = false;
                }

                if(this.report_show_flag == true){
                    console.log("报告组建调用了刷新")
                    this.report_show_flag = false;
                }
                //可以刷新列表什么的
                this.getBugsList()
            },
            getBugsList(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/cases/c_list',
                    params: {
                        'c_project':'超越项目组',
                        'c_version':'主版本',
                        'c_play':'跑得快15张'
                    }
                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    // 获取人员列表去重操作
                    that.select_option = remove(that.caseData);
                    for (var i in that.caseData){
                        that.setp_list = that.caseData[i]["c_operate"];
                        that.caseData[i]["c_step"] = (that.caseData[i]["c_operate"]); //操作步骤
                        that.caseData[i]["c_user"] = (midFormat(that.caseData[i]["c_mid"]));
                        that.caseData[i]["c_RoomOptions"] = roomDataFormat(that.caseData[i]["c_option"]); //创房选项
                        that.caseData[i]["show_time"] = timeFormat(that.caseData[i]["c_date"]);

                    }

                    that.showcaseData = that.caseData.slice(0, that.current_page_size);
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            //修改添加Bug实例弹窗显示状态
            ChangeAddFlag() {
                this.show_flag = true;
            },

            //修改修改Bug实例弹窗显示状态
            ChangeEditFlag(row){
                if(this.$store.state.user != null){
                    let new_data = JSON.parse(JSON.stringify(row));
                    this.current_data = new_data;
                    this.edit_show_flag = true;
                }else{
                    this.$message.error("请先登录.")
                }
            },


            // 删除bug数据
            handleDelete(index, row) {
                if(this.$store.state.user != null){
                    if(confirm("确认要删除么?")){
                        let c_id = row['c_id']
                        console.log(index, c_id);
                        let that = this;
                        axios({
                            method:'get',
                            url:'/api/cases/c_del',
                            params: {
                                'c_id': c_id
                            }
                        }).then(function(resp){
                            that.getBugsList();

                        }).catch(resp => {
                            console.log('请求失败：'+resp.status+','+resp.statusText);
                        });
                    }
                }else{
                    this.$message.error("请先登录.")
                }

            },

            RunCase(index, row){
                if(this.$store.state.user != null){
                    let c_id = row['c_id'];
                    let that = this;
                    that.$message.success("用例正在运行.");
                    axios({
                        method:'get',
                        url:'/api/cases/run',
                        params: {
                            'c_id': c_id
                        }
                    }).then(function(resp){
                        that.$message.success(resp.data)
                    }).catch(resp => {
                        that.$message.error(resp.data)
                    });
                }else{
                    this.$message.error("请先登录.")
                }

            },

            ReadReports(index, row){
                let r_id = row['c_id'];
                let that = this;
                axios({
                    method:'get',
                    url:'/api/cases/r_list',
                    params: {
                        'r_id': r_id
                    }
                }).then(function(resp){
                    that.report_current_data = resp.data.sort();
                    for (var i in that.report_current_data){
                        that.report_current_data[i]["r_end_time"] = timeFormat(that.report_current_data[i]["r_end_time"]);
                    }
                    that.report_show_flag = true
                }).catch(resp => {
                    that.$message.error('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            Search(){
                let that = this;
                var data_dict ={};
                if(that.selected_item.length !== 0){
                    for(var i in that.selected_item){
                        data_dict[i] = that.selected_item[i]
                    }
                }else {
                    for(var j in that.select_option){
                        data_dict[j] = that.select_option[j]["value"]
                    }
                }
                axios({
                    method:'get',
                    url:'/api/cases/search',
                    params: {
                        'data': data_dict,
                        'c_play': '跑得快15张'
                    }
                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    for (var i in that.caseData){
                        that.setp_list = that.caseData[i]["c_operate"];
                        that.caseData[i]["c_step"] = (that.caseData[i]["c_operate"]); //操作步骤
                        that.caseData[i]["c_user"] = (midFormat(that.caseData[i]["c_mid"]));
                        that.caseData[i]["c_RoomOptions"] = roomDataFormat(that.caseData[i]["c_option"]); //创房选项
                        that.caseData[i]["show_time"] = timeFormat(that.caseData[i]["c_date"]);
                    }
                    that.showcaseData = that.caseData.slice(0, that.current_page_size)
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 1) {
                    return 'success-row';
                }
                return '';
            },

            // 修改每页显示行数
            handleSizeChange(val) {
                this.current_page_size = val;
                this.showcaseData = this.caseData.slice(0, val)
            },

            //跳转第几页
            handleCurrentChange(val) {
                let count = this.current_page_size;
                let n = val;
                let end_index = count * n - 1;
                let start_index;
                if(n == 1){
                    start_index = 0;
                    end_index = count;
                }else{
                    end_index = end_index + 1;
                    start_index = end_index - count;
                }
                this.showcaseData = this.caseData.slice(start_index, end_index);


                this.currentPage = val
                console.log(`当前页: ${this.currentPage}`);
            },
        }
    }
</script>
