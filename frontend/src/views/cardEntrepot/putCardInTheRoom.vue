<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="房间配置牌"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">
            <div class="bottom">
                <el-tooltip class="item" effect="dark" placement="bottom-start">
                    <div slot="content">192.168.1.28< 常德，麻将，长沙本地服务器><br/>192.168.1.153< 跑胡子本地服务器 ><br/>9011：长沙版本<br/>9007: 跑胡子本地</div>
                    <el-button class="info_button">服务器信息说明</el-button>
                </el-tooltip>
            </div>
            <el-form ref="RoomDataFrom" :model="RoomDataFrom" :rules='addrules' label-width="100px">
                <el-form-item label="服务器选择" prop="c_server">
                    <template>
                        <el-select v-model="RoomDataFrom.server_value" placeholder="请选择" size="small" style="margin-right:10px;">
                            <el-option
                                    v-for="item in serverList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="端口选择 " prop="c_port" style="margin-right:10px;">
                    <template>
                        <el-select v-model="RoomDataFrom.port_vuale" placeholder="请选择" size="small">
                            <el-option
                                    v-for="item in portList"
                                    :key="item.value"
                                    :label="item.value"
                                    :value="item.label">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="房间ID" prop="c_roomID">
                    <el-input type="text" placeholder="输入房间ID" v-model="RoomDataFrom.room_id"></el-input>
                </el-form-item>
            </el-form>

            <el-alert v-if="re_data !== ''" type="error">{{ re_data }}</el-alert>
            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="SendRoom">提 交</el-button>
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
    .bottom {
        clear: both;
        text-align: right;

    }
    .info_button{
        background-color: #c6e2ff;
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
                serverList: [
                    {
                    value: '湖南麻将，常德，长沙，益阳本地服务器',
                    label: '192.168.1.28'
                    },
                    {
                        value: '跑胡子，四川本地服务器',
                        label: '192.168.1.153'
                    },
                    {
                        value: '娄底本地服务器',
                        label: '192.168.1.142'
                    },

                ],

                portList:[
                    {
                    value: '长沙',
                    label: '9011'
                    },
                    {
                        value: '常德',
                        label: '9010'
                    },
                    {
                        value: '湖南麻将，娄底',
                        label: '9037'
                    },
                    {
                        value: '跑胡子',
                        label: '9007'
                    },
                    {
                        value: '四川，益阳',
                        label: '9050'
                    },

                ],

                r_result: {
                    flag: false,
                },

                RoomDataFrom: {
                    port_vuale:"",
                    server_value:"",
                    room_id:"",
                },

                // 增加实例规则
                addrules: {

                    c_server: [
                        {
                            required: true, message: '请选择服务器', trigger: 'blur'
                        }
                    ],

                    c_port: [
                        {
                            required: true, message: '请选择端口', trigger: 'blur'
                        }
                    ],
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

        methods: {
            handleAvatarSuccess(res, file) {
                this.imageUrl = URL.createObjectURL(file.raw);
                console.log(12222222,this.imageUrl)
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log("zxcxzczcxz",file);},



            Closeed(){
                this.add_visible = false;
            },

            handleClose(done) {
                this.Closeed();
            },

            RemoveData(){
                this.$refs['RoomDataFrom'].resetFields();
            },

            Cancel(){
                this.$refs['RoomDataFrom'].resetFields();
                this.add_visible = false;
            },

            SendRoom(){
                if(this.$store.state.user != null){
                    let that = this;
                    axios({
                        method:'post',
                        url:'/api/addcard/send_room',
                        params: {
                            "c_server": this.RoomDataFrom.server_value,
                            "c_port": this.RoomDataFrom.port_vuale,
                            "c_roomID": this.RoomDataFrom.room_id,
                            "c_card":this.current_data.t_card,
                            "c_user":this.$store.state.user,
                        }

                    }).then(function(resp){
                        alert(resp.data);
                        // that.add_visible = false;
                        // setTimeout(() => {
                        //     that.$emit("reload")
                        // }, 800);
                    }).catch(resp => {
                        console.log('请求失败：'+resp.status+','+resp.statusText);
                        // that.re_data = resp.data
                    });
                }else {this.$message.error('请先登录!')}
            },

        }}
</script>
