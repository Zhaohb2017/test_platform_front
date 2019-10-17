<template>

    <div v-if="add_visible" class="lg">
        <el-dialog
                title="选择上传至服务器"
                width="80%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-table
                    :data="showSkillData"
                    style="width: 100%"
                    border
                    :row-class-name="tableRowClassName"
                    :header-cell-style="{background: '#F5F5F5'}"
                    :default-sort = "{prop: 'c_date', order: 'ascending'}">
                <el-table-column label="IP" width="150" min-width="150" header-align="center" prop="t_ip">
                </el-table-column>
                <el-table-column label="port" width="80" min-width="80" header-align="center" prop="t_port" >
                </el-table-column>
                <el-table-column label="账户" width="150" min-width="150" header-align="center" prop="t_user" >
                </el-table-column>
                <el-table-column label="密码" width="100" min-width="100" header-align="center" prop="t_pwd" >

                </el-table-column>
                <el-table-column label="路径" width="400" min-width="180" header-align="center" prop="t_path" >

                    <template slot-scope="scope">
                        <el-select v-model="senddata.t_path" placeholder="请选择" style="width: 100%" >
                            <el-option
                                    v-for="item in path_dict[scope.$index]"
                                    :key="item.c_path"
                                    :label="item.c_path"
                                    :value="item.c_path">
                            </el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="转换JSON数据" width="120" min-width="180" header-align="center" prop="on" align="center" >
                    <template slot-scope="scope">
                        <el-switch
                                v-model="scope.row.on"
                                on-color="#00A854"
                                on-text="启动"
                                active-text="开启"
                                on-value="1"
                                off-color="#F04134"
                                off-text="禁止"

                                off-value="0"
                                @change="changeSwitch(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>

                <el-table-column label="文件名" width="200" min-width="180" header-align="center" prop="t_filename" >
                </el-table-column>
                <el-table-column label="备注" width="200" min-width="180" header-align="center" prop="t_remark" >
                </el-table-column>
                <el-table-column header-align="center" label="操作" align="center">
                    <template slot-scope="scope">
                        <template>
                            <el-button type="primary" @click="Send(scope.row)"  onmouseover="this.style.background='#f8a88c'" onmouseout="this.style.background=''">发送</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>
            <span slot="footer" class="dialog-footer">
            <el-button type="danger" @click="Cancel">取 消</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
    .lg{
        text-align: center;
    }
    .el-textarea__inner{
        min-height: 125px;
    }

    .el-input{
        float: left;
    }

    .el-cascader{
        width: 100%;
    }

    //  弹窗样式
    .el-dialog__wrapper{
        margin-top: 5vh;
    }


    // 底部按钮居中
    .el-dialog__footer{
        text-align: center;
    }

    // 按钮样式
    .el-button{
        margin: 0 5%;



    }

    .avatar-uploader .el-upload {
        border: 2px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: red;
    }
    .avatar-uploader-icon {
        font-size: 22px;
        color: #8c939d;
        width: 88px;
        height: 88px;
        line-height: 88px;
        text-align: center;
    }
    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>


<script>
    import axios from 'axios'
    export default {
        props:['visible',"current_data"],
        data() {
            return {
                add_visible: this.visible,
                re_data: '',
                showSkillData:[{on:"1"},{t_path:""}],
                active:"",
                path_dict:[],
                value1: true,
                senddata:{

                    "t_filename":"",
                    "t_ip":"",
                    "t_path":"",
                    "t_port":"",
                    "t_pwd":"",
                    "t_user":"",

                },
                checked: false,
                r_result: {
                    flag: false,
                },


            };
        },

        // 监听弹窗可视
        watch:{
            visible(val){
                this.add_visible = val
            },
            add_visible(val){
                this.$emit('update:visible', val)
            }
        },
        mounted: function(){
            this.getKnowledgeList();
            this.changeSwitch();

        },
        methods: {

            changeSwitch (data) {
                console.log(111111111111111111,data)

            },
            reload() {
                if (this.edit_show_flag === true) {
                    console.log("编辑组件调用了刷新");
                    this.edit_show_flag = false;
                }
                if (this.show_flag === true) {
                    console.log("添加组件调用了刷新");
                    this.show_flag = false;
                }

                if (this.report_show_flag === true) {
                    console.log("报告组建调用了刷新");
                    this.report_show_flag = false;
                }
                //可以刷新列表什么的
                this.getKnowledgeList()
            },


            Send(data){
                let that = this;
                that.senddata.t_filename =data.t_filename;
                that.senddata.t_ip =data.t_ip;
                // that.senddata.t_path =data.t_path;
                that.senddata.t_port =data.t_port;
                that.senddata.t_pwd =data.t_pwd;
                that.senddata.t_user =data.t_user;
                if(data.on === undefined){
                    data.on = false;
                }
                axios({
                    method:'post',
                    url:'/api/deployip/send',
                    params: {
                        "on":data.on,
                        "ip":that.senddata.t_ip,
                        "port":that.senddata.t_port,
                        "user":that.senddata.t_user,
                        "pwd":that.senddata.t_pwd,
                        "path":that.senddata.t_path,
                        "filename":that.senddata.t_filename,
                        "card":this.current_data.t_card,
                    }

                }).then(function(resp){
                    var msg = resp.data ;
                    alert(msg);
                    this.add_visible = false;
                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    console.log('请求失败：'+resp.status+','+resp.statusText);
                });

            },
            
            getKnowledgeList() {
                let that = this;
                axios({
                    method: 'get',
                    url: '/api/deployip/i_list',
                }).then(function (resp) {
                    that.showSkillData = resp.data.sort();
                    for (var i in that.showSkillData){
                        that.path_dict.push(JSON.parse(JSON.stringify(that.showSkillData[i]['t_path'])));
                        // that.path_dict = (JSON.parse(JSON.stringify(that.showSkillData[i]['t_path'])));
                        console.log('fffffffff',that.path_dict);
                    }
                    that.showSkillData = that.showSkillData.slice(0, that.current_page_size);

                }).catch(resp => {
                    console.log('请求失败：' + resp.status + ',' + resp.statusText);
                });
            },
            Closeed(){
                this.add_visible = false;
            },

            Cancel(){
                this.add_visible = false;
            },
            tableRowClassName({row, rowIndex}) {
                if (rowIndex % 2 === 1) {
                    return 'success-row';
                }
                return '';
            },

            ToLinks(url) {
                window.open(url)
            }
        }}

</script>
