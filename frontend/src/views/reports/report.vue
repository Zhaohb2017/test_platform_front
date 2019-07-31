<template>
    <div v-if="report_flag">
        <el-dialog title="报告列表" center :visible.sync="report_flag" append-to-body>
            <el-table 
                :data="ReportData" 
                style="width: 100%" 
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'r_end_time', order: 'ascending'}">
                    <el-table-column prop="r_id" v-if="false">
                    </el-table-column>

                        
                    <el-table-column prop="r_case_id" v-if="false">
                    </el-table-column>

                    <el-table-column label="日期" prop="r_end_time" sortable header-align="center" align="center">
                    </el-table-column>

                    <el-table-column prop="r_name" label="报告" header-align="center" align="center">
                        <template slot-scope="scope">
                            <router-link tag="a" :to="'/' + 'api/report/' +  scope.row.r_name" target='_blank'>{{scope.row.r_name}}</router-link>
                        </template>
                    </el-table-column>

                </el-table>
        </el-dialog>
    </div>
</template>

<style scoped>
a{ 
    text-decoration:none;
} 
</style>


<script>
  export default {
    props:['visible', 'report_current_data'],
    data() {
      return {
        report_flag: this.visible,
        ReportData: [],
      };
    },

    created() {
        if(this.report_current_data){
          this.ReportData = this.report_current_data
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