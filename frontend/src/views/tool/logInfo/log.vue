<template>
    <div class="bugs">
        <!-- 添加、搜索功能 -->
        <div class="head" id="title">
            <h3>配牌操作日志</h3>
            <div class="head_fun">
                <el-button type="primary" @click="getBugsList">刷新数据</el-button>
<!--                <el-button type="success" round>成功按钮</el-button>-->
            </div>
        </div>
        <!-- 展示列表 -->
        <el-table
                :data="showcaseData"
                style="width: 90%;"
                border
                :row-class-name="tableRowClassName"
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'c_date', order: 'ascending'}">

            <el-table-column label="日期" width="110" prop="show_date" sortable header-align="center" align="center">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{scope.row.show_time}}</span>

                </template>
            </el-table-column>

            <el-table-column label="操作人" width="200" prop="c_user" header-align="center" align="center">
            </el-table-column>
            <el-table-column label="操作信息"  prop="c_info" header-align="center" align="center">
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
        margin-top: 8%;
        float: left;
        margin-left: 1%;
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
    import {timeFormat} from '../../../../libs/time.js'
    export default {
        components:{

        },

        data() {
            return {
                show_flag: false,
                edit_show_flag: false,
                report_show_flag: false,

                //  页面页数选择
                page_sizes_data: [10],
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

            }
        },

        mounted: function(){
            this.getBugsList();
        },

        methods: {
            reload(){
                if(this.edit_show_flag === true){
                    console.log("编辑组件调用了刷新");
                    this.edit_show_flag = false;
                }
                if(this.show_flag === true){
                    console.log("添加组件调用了刷新");
                    this.show_flag = false;
                }

                if(this.report_show_flag === true){
                    console.log("报告组建调用了刷新");
                    this.report_show_flag = false;
                }
                //可以刷新列表什么的
                this.getBugsList()
            },
            getBugsList(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/log/search',
                    params: {
                        'c_type':'操作日志'
                    }
                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    for (var i in that.caseData){
                        that.caseData[i]["show_time"] = timeFormat(that.caseData[i]["c_date"]);
                    }
                    console.log("fffff",that.caseData);
                    that.showcaseData = that.caseData.slice(0, that.current_page_size);
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
