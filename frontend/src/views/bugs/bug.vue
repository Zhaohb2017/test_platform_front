<template>
    <div class="bugs">
        
        <!-- 添加、搜索功能 -->
        <div class="head">
            <div class="head_fun">
                <el-button type="danger" @click="getBugsList">刷新数据</el-button>
                <el-button type="danger" @click="ChangeAddFlag" >添加Bug实例</el-button>
                <el-input type="text" prefix-icon="el-icon-search" required style="width:200px;" v-model="search_data" placeholder="请输入关键字搜索..."></el-input>
                <el-button type="primary" icon="el-icon-search" @click="Search" >搜索</el-button>
                <AddBugs :visible.sync="show_flag" v-if="show_flag" @reload="reload"></AddBugs>
            </div>
        </div>


        <!-- 展示列表 -->
        <el-table 
        :data="showBugData" 
        style="width: 100%" 
        border
        :row-class-name="tableRowClassName"
        :header-cell-style="{background: '#F5F5F5'}"
        :default-sort = "{prop: 'b_date', order: 'ascending'}">
            <el-table-column prop="b_id" v-if="false">
            </el-table-column>

            <el-table-column label="日期" width="180" prop="b_date" sortable header-align="center" align="center">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.b_date }}</span>
                </template>
            </el-table-column>

            <el-table-column label="提交人" width="120" prop="b_name" header-align="center" align="center">
            </el-table-column>

            <el-table-column label="Bug类别" width="130" header-align="center" align="center" prop="b_type">
            </el-table-column>

            <el-table-column label="直接结果" width="380" min-width="180" header-align="center" prop="b_result">
            </el-table-column>

            <el-table-column label="原因" width="380" min-width="180" header-align="center" prop="b_reason">
            </el-table-column>

            <el-table-column label="是否解决" width="130" align="center" prop="b_solve">
            </el-table-column>

            <el-table-column header-align="center" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="small" type="primary" :disabled="scope.row.b_solve == 1" @click="ChangeEditFlag(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" :disabled="scope.row.b_solve == 1" @click="handleDelete(scope.$index, scope.row)" icon="el-icon-delete"></el-button>
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
            :total="bugData.length">
            </el-pagination>
        </div>

         <EditBugs :visible.sync="edit_show_flag" v-if="edit_show_flag" :current_data="current_data" @reload="reload"></EditBugs>

        <!-- 提示内容 -->
        <div class="explain">
            <p class="tips">
                <i class="el-icon-document">Bug类别说明</i> 
            </p>
            <el-table :data="bugExplainData" border style="width: 100%" >
                <el-table-column prop="eb_type" label="Bug类别" min-width="100px" width="200px" align="center" header-align="center">
                </el-table-column>

                <el-table-column prop="eb_explain" label="说明" min-width="300px" width="650px" align="center" header-align="center">
                </el-table-column>
            </el-table>
        </div>
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
    margin-top: 5%;
    float: left;
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
import AddBugs from './add_bug'
import EditBugs from './edit_bug'
import {timeFormat} from '../../../libs/time.js'
import { truncate } from 'fs';
import { start } from 'repl';
  export default {
    components:{
        AddBugs,
        EditBugs,
    },

    data() {
      return {
        show_flag: false,
        edit_show_flag: false,
        
        // 搜索内容
        search_data: "",

        // 编辑子组件传递数据类型
        current_data:{},

        //  页面页数选择
        page_sizes_data: [5, 10],
        // 当前页面
        currentPage: 1,
        // 当前页面展示数据
        current_page_size: 5,

        // 服务端返回所有数据
        bugData: [],

        // table展示数据
        showBugData: [],

        // 当前初始的index
        start_index: 0,

        // 结束展示的index
        end_index: 0,

        bugExplainData:[
            {
                eb_type: "玩法Bug",
                eb_explain: "各产品玩法bug，包括算分、操作不等."
            },

            {
                eb_type: "俱乐部管理",
                eb_explain: "各产品俱乐部bug，包括固定玩法、设置不等."
            },

            {
                eb_type: "充值bug",
                eb_explain: "各产品因充值活动导致的bug，包括充值到账延时、邮件通知问题不等."
            },

            {
                eb_type: "分享bug",
                eb_explain: "各产品因分享导致的bug，包括分享拦截、无法加入房间问题不等."
            },

            {
                eb_type: "活动bug",
                eb_explain: "各产品活动bug, 根据活动需求自行抉择Bug问题."
            },

            {
                eb_type: "显示bug",
                eb_explain: "各产品显示bug，包括房间信息、背景不等."
            },

            {
                eb_type: "后台Bug",
                eb_explain: "各产品后台Bug，包括代理商后台等."
            },

            {
                eb_type: "第三方Bug",
                eb_explain: "问题原因出自微信或阿里云等三方."
            },
        ],
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
            
            //可以刷新列表什么的
            
            this.getBugsList()
        },
      getBugsList(){
          let that = this;
           axios({
              method:'get',
              url:'/api/bugs/b_list'
           }).then(function(resp){
              that.bugData = resp.data.sort();
              that.showBugData = that.bugData.slice(0, that.current_page_size);
              console.log("showBugData: ", that.showBugData);
              for(var i in that.showBugData){
                 that.showBugData[i]["b_date"] = timeFormat(that.showBugData[i]["b_date"]);
              }

              
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
          if(this.$store.state.user){
            this.current_data = row
            this.edit_show_flag = true;
          }else{
              this.$message.error("请先登录.")
          }
          
      },

    //   handleEdit(index, row) {
    //     this.ChangeEditFlag()
    //     console.log("编辑: ", index, row);
    //   },

      // 删除bug数据
      handleDelete(index, row) {
          if(this.$store.state.user){
            if(confirm("确认要删除么?")){
                let b_id = row['b_id']
                console.log(index, b_id);
                let that = this;
                axios({
                      method:'get',
                      url:'/api/bugs/b_del',
                    params: {
                        'b_id': b_id
                    }
                   }).then(function(resp){
                    that.getBugsList()
                    //that.bugData = resp.data;
                      
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
          if( that.search_data == ''){
              alert("请输入要搜索的内容.")
          }else{
            console.log("search: %s", that.search_data)
            axios({
              method:'get',
              url:'/api/bugs/search',
            params: {
                'b_name': that.search_data
            }
           }).then(function(resp){
            that.bugData = resp.data.sort();
            that.showBugData = that.bugData.slice(0, that.current_page_size)
            console.log("data", that.bugData)
              
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
        this.showBugData = this.bugData.slice(0, val)
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

            console.log("页面展示数: %s, 当前页面: %s, s_index: %s, e_index: %s", count, n, start_index, end_index)
            console.log("zzz", this.bugData)
            console.log("xxx", this.bugData.slice(start_index, end_index))
          this.showBugData = this.bugData.slice(start_index, end_index)

        //   this.bugData = (this.bugData).slice((index * val), this.bugData.length)
          this.currentPage = val
        console.log(`当前页: ${this.currentPage}`);
      },
    }
  }
</script>