<template>
    <div class="bugs">

        <!-- 添加、搜索功能 -->
        <div class="head">
            <h3>邵阳放炮罚</h3>
            <el-button type="danger" @click="getBugsList">刷新数据</el-button>
            <el-button type="danger" @click="ChangeAddFlag" >添加测试用例</el-button>
            <el-input type="text" prefix-icon="el-icon-search" required style="width:200px;" v-model="search_data" placeholder="请输入关键字搜索..."></el-input>
            <el-button type="primary" @click="Search" >搜索</el-button>
            <AddBugs :visible.sync="show_flag" v-if="show_flag" @reload="reload"></AddBugs>
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

            <el-table-column label="日期" width="130" prop="c_date" sortable header-align="center" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.c_date }}</span>
                </template>
            </el-table-column>

            <el-table-column label="提交人" width="100" prop="c_name" header-align="center" align="center">
            </el-table-column>

            <el-table-column label="测试目的" width="190" header-align="center" align="center" prop="c_purpose">
            </el-table-column>

            <el-table-column label="创房选项" width="290" min-width="180" header-align="center" prop="c_option">
            </el-table-column>

            <el-table-column label="做牌数据" width="290" min-width="180" header-align="center" prop="c_cards">
            </el-table-column>

            <el-table-column label="操作步骤" width="290" min-width="180" header-align="center" prop="c_operate">
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
    }

    .head{
        margin-bottom: 1%;
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
    import AddBugs from './add_syfpf'
    import EditBugs from './edit_syfpf'
    import Reports from '../../../../reports/report'
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

                // 搜索内容
                search_data: "",

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

                search: ''
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
                        'c_play':'邵阳放炮罚'
                    }
                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    that.showcaseData = that.caseData.slice(0, that.current_page_size)
                    console.log("showcaseData: ", that.showcaseData)

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
                    let new_data = JSON.parse(JSON.stringify(row))
                    new_data.c_option = eval('('+ row.c_option.replace("人数", "o_player").replace("局数", "o_round").replace("胡一等", "o_huyideng").replace("牌数", "o_card_num").replace("玩法", "o_wanfa") +')')
                    this.current_data = new_data
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
                            // that.caseData = resp.data.sort();
                            // that.showcaseData = that.caseData.slice(0, that.current_page_size)
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
                    let c_id = row['c_id']
                    let that = this;

                    // that.isRunning = row.c_id
                    that.$message.success("用例正在运行.")
                    axios({
                        method:'get',
                        url:'/api/cases/run',
                        params: {
                            'c_id': c_id
                        }
                    }).then(function(resp){
                        console.log("resp: %s", resp.data)
                        that.$message.success(resp.data)
                    }).catch(resp => {
                        that.$message.error(resp.data)
                    });
                }else{
                    this.$message.error("请先登录.")
                }

            },

            ReadReports(index, row){
                let r_id = row['c_id']
                let that = this;
                axios({
                    method:'get',
                    url:'/api/cases/r_list',
                    params: {
                        'r_id': r_id
                    }
                }).then(function(resp){
                    console.log(resp.data)
                    that.report_current_data = resp.data.sort();
                    that.report_show_flag = true
                }).catch(resp => {
                    that.$message.error('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            Search(){
                let that = this;
                if( that.search_data == ''){
                    alert("请输入要搜索的内容.")
                }else{
                    console.log("search: %s", that.search_data)
                    axios({
                        method:'get',
                        url:'/api/cases/search',
                        params: {
                            'c_name': that.search_data
                        }
                    }).then(function(resp){
                        that.caseData = resp.data.sort();
                        that.showcaseData = that.caseData.slice(0, that.current_page_size)
                        console.log("data", that.caseData)

                    }).catch(resp => {
                        console.log('请求失败：'+resp.status+','+resp.statusText);
                    });
                }
            },



            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 1) {
                    return 'success-row';
                }
                return '';
            },

            // 修改每页显示行数
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.current_page_size = val
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
                this.showcaseData = this.caseData.slice(start_index, end_index)

                //   this.caseData = (this.caseData).slice((index * val), this.caseData.length)
                this.currentPage = val
                console.log(`当前页: ${this.currentPage}`);
            },
        }
    }
</script>
