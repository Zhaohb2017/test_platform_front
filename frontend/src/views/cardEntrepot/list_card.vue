<template>
    <div class="bugs">
        <!-- 添加、搜索功能 -->
        <div class="head">
            <h3>牌库</h3>
            <el-button type="danger" @click="getKnowledgeList">刷新数据</el-button>
            <el-button type="danger" @click="ChangeAddFlag" >添加牌数据</el-button>
            <el-input type="text" prefix-icon="el-icon-search" required style="width:200px;" v-model="search_data" placeholder="请输入玩法搜索..."></el-input>
            <el-button type="primary" @click="Search" >搜索</el-button>
            <Addknowledge :visible.sync="show_flag" v-if="show_flag" @reload="reload"></Addknowledge>
            <LoginName :visible.sync="dialogTableVisible" v-if="dialogTableVisible" :current_data="current_data" @reload="reload"></LoginName>
            <PutCard :visible.sync="putCardInTheRoomVisible" v-if="putCardInTheRoomVisible" :current_data="current_data" @reload="reload"></PutCard>

        </div>

        <!-- 展示列表 -->

        <el-table
                :data="showPageData"
                style="width: 100%"
                border
                :row-class-name="tableRowClassName"
                :header-cell-style="{background: '#F5F5F5'}"
                :default-sort = "{prop: 'c_date', order: 'ascending'}">

            <el-table-column label="版本" width="180" min-width="180" header-align="center" prop="t_versions">
            </el-table-column>

            <el-table-column label="玩法" width="180" min-width="180" header-align="center" prop="t_method">
            </el-table-column>

            <el-table-column label="牌" width="700" min-width="180" header-align="center" prop="t_card" >
            </el-table-column>

            <el-table-column label="功能" width="200" min-width="180" header-align="center" prop="t_remark">
            </el-table-column>

            <el-table-column header-align="center" label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="ChangeConfig(scope.$index, scope.row)">配置至服务器</el-button>
                    <el-button size="mini" type="primary" @click="putCardInTheRoom(scope.$index, scope.row)">配置至房间</el-button>
                    <el-button size="mini" type="danger" @click="handleDelete(scope.$index,scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>

        <div class="block">
            <el-pagination
                    
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="page_sizes_data"
                    :page-size="current_page_size"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="showSkillData.length">
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

<script type="es6">
    import axios from 'axios'
    import Addknowledge from './add_card'
    import LoginName   from "./ShowDeployIP"
    import PutCard   from "./putCardInTheRoom"
    export default {
        components:{
            Addknowledge,
            LoginName,
            PutCard,

        },
        name:"list_card",

        data() {
            return {
                show_flag: false,
                edit_show_flag: false,
                report_show_flag: false,
                show_deploy:false,
                dialogTableVisible:false,
                putCardInTheRoomVisible:false,
                // 搜索内容
                search_data: "",

                // 编辑子组件传递数据类型
                current_data:{},
                currentPage:1,
                // 报告数据
                report_current_data: [],

                //  页面页数选择
                page_sizes_data: [5],
                //页面展示数据
                showPageData:[],

                // 当前页面展示数据
                current_page_size: 5,

                // table展示数据
                showSkillData: [],

                value:"",

                // 当前初始的index
                start_index: 0,

                // 结束展示的index
                end_index: 0,

                search: '',
                list :[],
                str_data:"",




            }
        },

        mounted: function(){
            this.getKnowledgeList();
        },

        methods: {


            reload(){
                if(this.edit_show_flag == true){

                    this.edit_show_flag = false;
                }
                if(this.show_flag == true){

                    this.show_flag = false;
                }

                if(this.report_show_flag == true){

                    this.report_show_flag = false;
                }
                if(this.show_deploy == true){

                    this.show_deploy = false;
                }
                //可以刷新列表什么的
                this.getKnowledgeList()

            },

            //配置服务器ip弹窗
            ChangeConfig(index,row){
                this.current_data = row;
                this.dialogTableVisible=true;

            },

            putCardInTheRoom(index,row){
                this.current_data = row;
                this.putCardInTheRoomVisible=true;

            },

            getKnowledgeList(){
                let that = this;
                axios({
                    method:'get',
                    url:'/api/addcard/c_list',
                }).then(function(resp){
                    that.showSkillData = resp.data.sort();
                    that.showPageData = that.showSkillData.slice(0, that.current_page_size); //
                    console.log(111111111111111111,that.showSkillData)
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
            },

            //修改添加Bug实例弹窗显示状态
            ChangeAddFlag() {
                this.show_flag = true;
                console.log("刷新弹窗: ", this.show_flag)
            },

            SendData(row){
                this.show_deploy = true;
                console.log("xxxxxxxxxxxxxx: ", this.show_deploy);
                let that = this;
                axios({
                    method:'post',
                    url:'/api/deployip/send',
                    params: {
                        'id': that.value.substring(2,that.value.indexOf("-")),
                        'card':row.t_card,
                    }
                }).then(function(resp){
                    alert(resp.data)
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });
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
                            url:'/api/addcard/c_del',
                            params:{
                                't_id': t_id
                            },
                        }).then(function (resp) {
                            that.getKnowledgeList();

                        }).catch(resp =>{
                            console.log('请求失败：'+resp.status+','+resp.statusText);
                        })

                    }else{
                        this.$message.error("请先登录.")
                    }
                }

            },


            Search(){
                let that = this;
                console.log("search: %s", that.search_data)
                axios({
                    method:'get',
                    url:'/api/addcard/search',
                    params: {
                        't_play': that.search_data
                    }
                }).then(function(resp){
                    that.showSkillData = resp.data.sort();
                    that.showPageData = that.showSkillData.slice(0, that.current_page_size);
                    console.log("data", that.showPageData)

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
            // 每页条数变更
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.current_page_size = val;
                this.showSkillData = this.showSkillData.slice(0, val);
                console.log("@@@@@@@@@",this.showSkillData)
            },

            // 当前页码变更
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
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
                console.log("start_index  "+start_index);
                console.log("end_index  "+ end_index);
                this.showPageData = this.showSkillData.slice(start_index, end_index);

                //   this.caseData = (this.caseData).slice((index * val), this.caseData.length)
                this.currentPage = val
                console.log(`当前页: ${this.currentPage}`);
            },


            ToLinks(url){
                window.open(url)
            }
    }}

</script>
