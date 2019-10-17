<template>
    <div class="bugs">
        <!-- 添加、搜索功能 -->
        <div class="head">
            <h3>配置服务器IP</h3>
            <div class="head_fun">
                <el-button type="danger" @click="getKnowledgeList">刷新数据</el-button>
                <el-button type="danger" @click="ChangeAddFlag" >添加服务器IP</el-button>
                <el-input type="text" prefix-icon="el-icon-search" required style="width:200px;" v-model="search_data" placeholder="IP搜索..."></el-input>
                <el-button type="primary" @click="Search" >搜索</el-button>
                <Addknowledge :visible.sync="show_flag" v-if="show_flag" @reload="reload"></Addknowledge>
            </div>
        </div>

        <!-- 展示列表 -->
        <el-table
                :data="showSkillData"
                style="width: 100%"
                border
                :row-class-name="tableRowClassName"
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'c_date', order: 'ascending'}">
<!--            <el-table-column prop="c_id" v-if="false">-->
<!--            </el-table-column>-->


            <el-table-column label="IP" width="150" min-width="150" header-align="center" prop="t_ip">
            </el-table-column>

            <el-table-column label="port" width="100" min-width="100" header-align="center" prop="t_port" >
            </el-table-column>
            <el-table-column label="账户" width="150" min-width="150" header-align="center" prop="t_user" >
            </el-table-column>
            <el-table-column label="密码" width="150" min-width="180" header-align="center" prop="t_pwd" >
            </el-table-column>
            <el-table-column label="路径" width="400" min-width="180" header-align="center" prop="path" >
            </el-table-column>
            <el-table-column label="文件名" width="200" min-width="180" header-align="center" prop="t_filename" >
            </el-table-column>
            <el-table-column label="备注" width="200" min-width="180" header-align="center" prop="t_remark" >
            </el-table-column>

            <el-table-column header-align="center" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)" icon="el-icon-delete" circle></el-button>
                </template>
            </el-table-column>


        </el-table>

        <!-- 分页 -->

        <div class="block">
            <el-pagination

                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="page_sizes_data"
                    :page-size="current_page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="showDeployData.length">
            </el-pagination>
        </div>

        <EditSkills :visible.sync="edit_show_flag" v-if="edit_show_flag" :current_data="current_data" @reload="reload" ></EditSkills>

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
        margin-left: -18%;
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
    import Addknowledge from './add_ip'
    export default {
        components:{
            Addknowledge,
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
                showSkillData: [],
                showDeployData: [],

                // 当前初始的index
                start_index: 0,

                // 结束展示的index
                end_index: 0,

                search: ''
            }
        },

        mounted: function(){
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
            getKnowledgeList(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/deployip/i_list',
                }).then(function(resp){
                    that.showDeployData = resp.data.sort();
                    for (var i in that.showDeployData) {
                        that.showDeployData[i]["path"] = (that.showDeployData[i]["t_path"]);
                        that.showDeployData[i]["path"] = JSON.stringify(that.showDeployData[i]["path"]);
                    }
                    that.showSkillData = that.showDeployData.slice(0, that.current_page_size);

                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            //修改添加Bug实例弹窗显示状态
            ChangeAddFlag() {
                this.show_flag = true;
                console.log("刷新弹窗: ", this.show_flag)
            },

            // 删除数据
            handleDelete(index, row) {
                if(this.$store.state.user != null){
                    if(confirm("确认要删除么?")){
                        let t_id = row['t_id']
                        console.log(11111,index, t_id);
                        let that = this;
                        axios({
                            method:'get',
                            url:'/api/deployip/i_del',
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
                console.log("search: %s", that.search_data);
                axios({
                    method:'get',
                    url:'/api/deployip/search',
                    params: {
                        't_ip': that.search_data
                    }
                }).then(function(resp){
                    that.showDeployData = resp.data.sort();
                    that.showSkillData = that.showDeployData.slice(0, that.current_page_size);
                    console.log("data", that.showSkillData)
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
                this.showSkillData = this.showDeployData.slice(start_index, end_index);

                this.currentPage = val
                console.log(`当前页: ${this.currentPage}`);
            },

            ToLinks(url){
                window.open(url)
            }
        }
    }
</script>
