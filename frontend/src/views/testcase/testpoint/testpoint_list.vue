<template>
  <div class="bugs">

    <!-- 添加、搜索功能 -->
    <div class="head">
      <h3>版本功能测试点</h3>
      <el-button type="danger" @click="getBugsList">刷新数据</el-button>
      <el-button type="danger" @click="ChangeAddFlag" >添加测试点</el-button>
      <el-input type="text" prefix-icon="el-icon-search" required style="width:200px;" v-model="search_data" placeholder="请输入关键字搜索..."></el-input>
      <el-button type="primary" @click="Search" >搜索</el-button>
      <AddPoint :visible.sync="show_flag" v-if="show_flag" @reload="reload"></AddPoint>
    </div>


    <!-- 展示列表 -->
    <el-table
      :data="showPointData"
      style="width: 100%"
      border
      :row-class-name="tableRowClassName"
      :header-cell-style="{background: '#F5F5F5'}"
      :default-sort = "{prop: 'c_date', order: 'ascending'}">
      <el-table-column prop="c_id" v-if="false">
      </el-table-column>

      <el-table-column label="创建时间" width="130" prop="t_date" sortable header-align="center" align="center">
        <template slot-scope="scope">
          <i class="el-icon-time"></i>
          <span style="margin-left: 10px">{{ scope.row.t_date }}</span>
        </template>
      </el-table-column>

      <el-table-column label="创建人" width="100" prop="t_user" header-align="center" align="center">
      </el-table-column>

      <el-table-column label="版本" width="100" header-align="center" align="center" prop="t_version">
      </el-table-column>

      <el-table-column label="模块" width="100" min-width="180" header-align="center" prop="t_module">
      </el-table-column>

      <el-table-column label="测试点" width="290" min-width="180" header-align="center" prop="t_content">
      </el-table-column>

      <el-table-column label="影响范围" width="290" min-width="180" header-align="center" prop="t_remark">
      </el-table-column>

      <el-table-column label="界面信息" width="230" align="center" prop="t_img">
      </el-table-column>

      <el-table-column label="入库状态" width="100" align="center" prop="t_storage">
      </el-table-column>

      <el-table-column label="是否失效" width="100" align="center" prop="t_usable">
      </el-table-column>

      <el-table-column header-align="center" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="ChangeEditFlag(scope.row)" icon="el-icon-edit" circle></el-button>

          <el-button size="mini" type="danger" @click="handleDelete(scope.row)" icon="el-icon-delete" circle></el-button>

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
    import AddPoint from './testpoint_add'
    // import EditBugs from './edit_cdphz'
    import { truncate } from 'fs';
    import { start } from 'repl';
    export default {
        components:{
            AddPoint,
            // EditBugs,
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
                showPointData: [],

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
                    url:'/api/knowledge/k_list',
                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    console.log(that.caseData)
                    that.showPointData = that.caseData.slice(0, that.current_page_size)
                    console.log("showPointData: ", that.showPointData)

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
            handleDelete(row) {
                if(this.$store.state.user != null){
                    if(confirm("确认要删除么?")){
                        let t_id = row['t_id']
                        console.log(111111111111, row);
                        let that = this;
                        axios({
                            method:'get',
                            url:'/api/knowledge/k_del',
                            params: {
                                'c_id': t_id
                            }
                        }).then(function(resp){
                            that.caseData = resp.data.sort();
                            that.showPointData = that.caseData.slice(0, that.current_page_size)
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
                            't_user': that.search_data
                        }
                    }).then(function(resp){
                        that.caseData = resp.data.sort();
                        that.showPointData = that.caseData.slice(0, that.current_page_size)
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
                this.showPointData = this.caseData.slice(start_index, end_index)

                //   this.caseData = (this.caseData).slice((index * val), this.caseData.length)
                this.currentPage = val
                console.log(`当前页: ${this.currentPage}`);
            },
        }
    }
</script>
