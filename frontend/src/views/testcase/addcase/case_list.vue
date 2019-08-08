
<template>
    <div class="bugs" id="orderFullScreen">
        <!-- 添加、搜索功能 -->
        <div class="head">
            <h3>用例仓库</h3>
            <el-button type="danger" @click="getTestCaseList">刷新数据</el-button>
            <el-button type="danger" @click="ChangeAddFlag" >添加用例</el-button>
            <el-input type="text" prefix-icon="el-icon-search" required style="width:200px;" v-model="search_data" placeholder="支持模糊查询"></el-input>
            <el-button type="primary" @click="Search" >搜索</el-button>
            <input type="file" ref="upload" accept=".xls,.xlsx" @change="readExcel" placeholder="file"></input>
            <el-button type="primary" @click="batchProduce" size="small" round>批量生成<i class="el-icon-download el-icon--right"></i></el-button>
            <el-button type="primary" @click="downloadExcel" size="small" round>下载数据<i class="el-icon-upload2 el-icon--right"></i></el-button>
            <Addknowledge :visible.sync="show_flag" v-if="show_flag" @reload="reload"></Addknowledge>
        </div>
       <!-- 展示列表  -->
        <el-scrollbar class="page-scroll" style="height: 100%">
            <div>
                <el-table
                        :data="showPageData"
                        style="width: 100%"
                        border
                        :row-class-name="tableRowClassName"
                        :header-cell-style="{background: '#F5F5F5'}"
                        :default-sort = "{prop: 'c_date', order: 'ascending'}">
                    <el-table-column prop="c_id" v-if="false">
                    </el-table-column>
                    <el-table-column label="版本" width="100" min-width="180" header-align="center" prop="t_versions">
                    </el-table-column>
                    <el-table-column label="模块" width="100" min-width="180" header-align="center" prop="t_module">
                    </el-table-column>
                    <el-table-column label="测试点" width="100" min-width="180" header-align="center" prop="t_testpointVal">
                    </el-table-column>
                    <el-table-column label="前置条件" width="100" min-width="180" header-align="center" prop="t_precondition">
                    </el-table-column>
                    <el-table-column label="操作步骤" width="400" min-width="180" header-align="center" prop="t_step">
                    </el-table-column>
                    <el-table-column label="预期结果" width="200" min-width="180" header-align="center" prop="t_expectedResult">
                    </el-table-column>
                    <el-table-column label="实际结果" width="200" min-width="180" header-align="center" prop="t_actualResults">
                    </el-table-column>
                    <el-table-column label="是否通过" width="50" min-width="180" header-align="center" prop="t_pass">
                    </el-table-column>
                    <el-table-column label="是否有效" width="50" min-width="180" header-align="center" prop="t_effective">
                    </el-table-column>
                    <el-table-column label="备注" width="160" min-width="180" header-align="center" prop="t_remark">
                    </el-table-column>
                    <el-table-column header-align="center" label="操作" align="center">
                        <template slot-scope="scope">
                            <el-button size="mini" type="primary" @click="ChangeEditFlag(scope.$index,scope.row)" icon="el-icon-edit" circle></el-button>
                            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)"  icon="el-icon-delete" circle></el-button>
                        </template>
                    </el-table-column>

                </el-table>
            </div>
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
        </el-scrollbar>


        <Edit :visible.sync="edit_show_flag" v-if="edit_show_flag" :current_data="current_data" @reload="reload"></Edit>

    </div>

</template>

<style lang="less" scoped>
    .page-scroll{
        height: 100%;
        overflow-x: hidden;
        position: absolute;
    }

    .bugs{
        margin: 1%;
    /*    height: 100%;*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    right: 0;*/
    /*    bottom: 0;*/
    /*    left: 0;*/
    /*    overflow: auto;*/
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
    import Addknowledge from './add_case'
    import Edit from './case_edit'
    import XLSX from 'xlsx'
    import exportExcelCommon from './ExportExcelCommon'
    import FileSaver from 'file-saver'
    export default {
        name:'Excel',
        components:{
            Addknowledge,
            Edit,
            exportExcelCommon
        },

        data() {
            return {

                show_flag: false,
                edit_show_flag: false,
                report_show_flag: false,

                outputs: [],
                t_info: [],


                // 搜索内容
                search_data: "",
                //excel数据
                excelData:[],

                excelDownloadData:[],

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
                showData: [],

                // 当前初始的index
                start_index: 0,

                // 结束展示的index
                end_index: 0,

                search: ''
            }
        },

        mounted: function(){
            this.getTestCaseList();
            document.getElapsedTime("page-scroll").addEventListener('scroll', this.handleScroll)
        },

        methods: {
            // 获取滚动条高度
            handleScroll(){
                console.log(document.getElementById('page-scroll').scrollTop)
            },

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
                this.getTestCaseList()
            },
            readExcel(e){
                let that = this;
                const files = e.target.files;
                if (files.length < 1){
                    return false
                }else if(!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())){
                    this.$toast('上传文件格式不正确，请上传xls或者xlsx格式');
                    return false
                }
                const fileReader = new FileReader();
                fileReader.onload = (ev) => {
                    try{
                        const data = ev.target.result;
                        const workbook = XLSX.read(data,{
                            type: 'binary'
                        });// 读取数据
                        const wsname = workbook.SheetNames[0];// 取第一张表
                        console.log("第一张表数据",wsname);
                        const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); // 生成json表格内容
                        that.excelData = ws;
                        console.log(ws,typeof ws);

                        // that.outputs = []; // 清空接收数据
                        // for (let i = 0; i < ws.length; i++) {
                        //     console.log("读取数据："+ws[i]);
                        //     let sheetData = ws[i];// 对数据自行操作
                        //     that.outputs.push(sheetData)
                        // }
                        // console.log("表数据："+that.outputs);
                        // this.$refs.upload.value = ''
                    }catch (e) {
                        console.log("error: "+e);
                        return false
                    }
                };
                fileReader.readAsBinaryString(files[0])

            },
            //批量生成
            batchProduce(){
                let that = this;
                if(this.excelData.length == 0){
                    this.$message.error("请选择文件");
                    return
                }
                var jsonData = JSON.parse(JSON.stringify(this.excelData));
                console.log(3333333333333333333,jsonData);
                axios({
                    method:'post',
                    url:'/api/knowledge/excel_data',
                    data: {
                        "data": this.excelData,
                    }
                }).then(function (resp) {
                    if(resp.data["code"] == 200 ){
                        that.getTestCaseList();
                    }
                    alert(resp.data["msg"]);
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            downloadExcel(){
                console.log("我来导出数据了");
                this.$confirm('确定下载列表文件?', '提示',{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }
                ).then(() =>{
                    this.excelDownloadData = this.caseData; //你要导出的数据list。
                    this.export2Excel()
                }).catch(() =>{

                })

            },
            //数据写入excel
            export2Excel() {
                var that = this;
                require.ensure([], () => {
                    const { export_json_to_excel } = require('@/excel/export2Excel'); //这里必须使用绝对路径，使用@/+存放export2Excel的路径
                    const tHeader = ['版本','模块','测试点','前提条件','操作步骤','预期结果','实际结果','是否通过','是否有效','备注']; // 导出的表头名信息
                    const filterVal = ['t_versions','t_module','t_testpointVal','t_precondition','t_step','t_expectedResult','t_actualResults','t_pass','t_effective','t_remark']; // 导出的表头字段名，需要导出表格字段名
                    const list = that.excelDownloadData;
                    console.log("写入数据："+list);
                    const data = that.formatJson(filterVal, list);

                    console.log("xxxxxxxxxxxx",data);
                    export_json_to_excel(tHeader, data, '测试用例数据');// 导出的表格名称，根据需要自己命名
                })
            },
            //格式转换，直接复制即可
            formatJson(filterVal, jsonData) {
                return jsonData.map(v => filterVal.map(j => v[j]))

            },

            getTestCaseList(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/knowledge/case_list',

                }).then(function(resp){
                    that.caseData = resp.data.sort();
                    that.showPageData = that.caseData.slice(0, that.current_page_size);

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

            // 删除数据
            handleDelete(index, row) {
                if(this.$store.state.user != null){
                    if(confirm("确认要删除么?")){
                        let t_id = row['t_id'];
                        console.log(11111,index, t_id);
                        let that = this;
                        axios({
                            method:'get',
                            url:'/api/knowledge/case_delete',
                            params: {
                                't_id': t_id
                            }
                        }).then(function(resp){
                            that.getTestCaseList();
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
                axios({
                    method:'get',
                    url:'/api/knowledge/case_search',
                    params: {
                        'data': that.search_data
                    }
                }).then(function(resp){
                    that.showSkillData = resp.data.sort();
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
                this.showPageData = this.caseData.slice(0, val)
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

                this.showPageData = this.caseData.slice(start_index, end_index);

                //   this.caseData = (this.caseData).slice((index * val), this.caseData.length)
                this.currentPage = val;
                console.log(`当前页: ${this.currentPage}`);
            },


            ToLinks(url){
                window.open(url)
            }
        }
    }
</script>
