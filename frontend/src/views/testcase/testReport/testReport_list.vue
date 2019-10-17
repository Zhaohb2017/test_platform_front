<template>
    <div class="bugs">
        <!-- 添加、搜索功能 -->
        <div class="head">
            <h3>测试报告</h3>
            <div class="head_fun">
                <el-button type="danger" @click="getKnowledgeList">刷新数据</el-button>
                <el-button type="danger" @click="ChangeAddFlag" >添加测试报告</el-button>
                <el-input type="text" prefix-icon="el-icon-search" required style="width:150px;" v-model="search_data_versions" placeholder="版本名称搜索"></el-input>
                <el-input type="text" prefix-icon="el-icon-search" required style="width:150px;" v-model="search_data_phase" placeholder="测试阶段搜索"></el-input>
                <el-button type="primary" @click="Search" >搜索</el-button>

                <Addknowledge :visible.sync="show_flag" v-if="show_flag" @reload="reload"></Addknowledge>

            </div>
        </div>

        <!-- 展示列表 -->

        <el-table
                :data="showPageData"
                style="width: 100%"
                border
                :row-class-name="tableRowClassName"
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'c_date', order: 'ascending'}">
            <el-table-column prop="c_id" v-if="false">
            </el-table-column>

            <el-table-column label="创建时间" width="200" prop="t_date" sortable header-align="center" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.t_date }}</span>
                </template>
            </el-table-column>

            <el-table-column label="版本名称" width="500" min-width="180" header-align="center" prop="c_versions">
            </el-table-column>

            <el-table-column label="测试阶段" width="500" min-width="180" header-align="center" prop="c_phase">
            </el-table-column>


            <el-table-column header-align="center" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="ReadReports(scope.$index, scope.row)">查看报告</el-button>

                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete" circle></el-button>

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
                    :total="showSkillData.length">
            </el-pagination>
        </div>

        <EditSkills :visible.sync="edit_show_flag" v-if="edit_show_flag" :current_data="current_data" @reload="reload"></EditSkills>
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
        margin-left: -10%;
        margin-bottom: 5%;
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
    import Addknowledge from './testReport_add'
    import EditSkills from './testReport_edit'
    import Reports from '../../reports/testReport'
    import {timeFormat} from '../../../../libs/time.js'
    export default {
        components:{
            Addknowledge,
            EditSkills,
            Reports,
        },

        data() {
            return {
                show_flag: false,
                edit_show_flag: false,
                report_show_flag: false,

                // 搜索内容
                search_data_versions: "",
                search_data_phase:"",

                // 编辑子组件传递数据类型
                current_data:{},
                //页面展示数据
                showPageData:[],
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
                showSkillData: [],

                // 当前初始的index
                start_index: 0,

                // 结束展示的index
                end_index: 0,

                search: ''
            }
        },

        mounted: function() {
            this.getKnowledgeList();
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
                this.getKnowledgeList()
            },

        //----------------------------------------------------------------------------------------
            getKnowledgeList(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/testReport/t_list',
                }).then(function(resp){
                    that.showSkillData = resp.data.sort();
                    for(var i in that.showSkillData){
                        that.showSkillData[i]["t_date"] = timeFormat(that.showSkillData[i]["c_date"]);
                    }
                    that.showPageData = that.showSkillData.slice(0, that.current_page_size);
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            //修改添加Bug实例弹窗显示状态
            ChangeAddFlag() {
                this.show_flag = true;
                console.log("刷新弹窗: ", this.show_flag)
            },

            //修改修改Bug实例弹窗显示状态
            ChangeEditFlag(index,row){
                if(this.$store.state.user != null){
                    let new_data = JSON.parse(JSON.stringify(row));
                    this.current_data = new_data;
                    this.edit_show_flag = true;
                }else{
                    this.$message.error("请先登录.")
                }

            },


            ReadReports(index, row){
                let r_id = row['c_id'];
                let that = this;
                axios({
                    method:'get',
                    url:'/api/testReport/report',
                    params: {
                        'r_id': r_id
                    }
                }).then(function(resp){
                    console.log(resp.data);
                    that.report_current_data = resp.data.sort();
                    for (var i in that.report_current_data){
                        that.report_current_data[i]["r_end_time"] = timeFormat(that.report_current_data[i]["r_end_time"]);
                    }
                    that.report_show_flag = true
                }).catch(resp => {
                    that.$message.error('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            // 删除数据
            handleDelete(index, row) {
                if(this.$store.state.user != null){
                    if(confirm("确认要删除么?")){
                        let t_id = row['c_id'];
                        console.log(11111,index, t_id);
                        let that = this;
                        axios({
                            method:'get',
                            url:'/api/testReport/t_del',
                            params: {
                                't_id': t_id
                            }
                        }).then(function(resp){
                            that.getKnowledgeList();

                        }).catch(resp => {
                            console.log('请求失败：'+resp.status+','+resp.statusText);
                        });
                    }
                }else{
                    this.$message.error("请先登录.")
                }

            },



            Search(){
                let that = this;
                var data_dict = {};
                data_dict["c_versions"] = that.search_data_versions;
                data_dict["c_phase"] = that.search_data_phase;

                axios({
                    method:'get',
                    url:'/api/testReport/search',
                    params: {
                        'data': data_dict
                    }
                }).then(function(resp){
                    that.showSkillData = resp.data.sort();
                    for(var i in that.showSkillData){
                        that.showSkillData[i]["t_date"] = timeFormat(that.showSkillData[i]["c_date"]);
                    }
                    that.showPageData = that.showSkillData.slice(0, that.current_page_size);

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
                console.log(`每页 ${val} 条`);
                this.current_page_size = val;
                this.showPointData = this.caseData.slice(0, val)
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
                this.showPageData = this.showSkillData.slice(start_index, end_index);

                //   this.caseData = (this.caseData).slice((index * val), this.caseData.length)
                this.currentPage = val
                console.log(`当前页: ${this.currentPage}`);
            },


            ToLinks(url){
                window.open(url)
            }
        }
    }
</script>
