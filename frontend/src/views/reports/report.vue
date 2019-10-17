<template>
    <div v-if="report_flag">
        <el-dialog title="报告列表" center :visible.sync="report_flag" append-to-body>
            <div class="warn" >
                <el-link  disabled style="padding-bottom: 2%">提示：仅展示最新二十条测试报告</el-link>
            </div>
            <el-table 
                :data="ReportData" 
                style="width: 100%" 
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'r_end_time', order: 'descending'}">

                    <el-table-column prop="r_id" v-if="false">
                    </el-table-column>

                    <el-table-column prop="r_case_id" v-if="false">
                    </el-table-column>
                                        <!--sortable  日期倒序查看-->
                    <el-table-column label="日期" prop="r_end_time"  header-align="center" align="center">
                    </el-table-column>

                    <el-table-column prop="r_name" label="报告" header-align="center" align="center">
                        <template slot-scope="scope">
                            <router-link tag="a" :to="'/' + 'api/report/' +  scope.row.r_name" target='_blank'>{{scope.row.r_name}}</router-link>
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
                        :total="report_current_data.length">
                </el-pagination>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
a{ 
    text-decoration:none;
}
    .block{
        margin-top: 1%;
        text-align: center;
    }
.warn{
    float: right;
    color:#fd7e14;
    padding-bottom: 1%;

}
</style>


<script>
  export default {
    props:['visible', 'report_current_data'],
    data() {
      return {
        // 当前页面展示数据
        current_page_size: 5,
        //  页面页数选择
        page_sizes_data: [5],
        // 当前页面
        currentPage: 1,
        report_flag: this.visible,
        ReportData: [],

      };
    },
    methods:{
        // 修改每页显示行数
        handleSizeChange(val) {
            let that = this;
            console.log(`每页 ${val} 条`);
            this.current_page_size = val;
            this.ReportData = this.report_current_data.slice(0, val)
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
            this.ReportData = this.report_current_data.slice(start_index, end_index);

            this.currentPage = val;
            console.log(`当前页: ${this.currentPage}`);
        },
    },

    created() {
        let that = this;
        if(this.report_current_data){
          this.ReportData = this.report_current_data.slice(0, that.current_page_size);
            console.log("ggggggggggggg",this.ReportData,typeof this.ReportData);

        }
    },

    watch:{
      visible(val){
        this.report_flag = val
      },

      report_flag(val){
        this.$emit('update:visible', val)
      }
    },
  }
</script>