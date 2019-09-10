<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加跑脚本配置"
                width="30%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="AddServiceFrom" :model="AddServiceFrom" :rules='addrules' label-width="80px">
                <el-form-item label="IP" prop="c_ip">
                    <el-input type="text" placeholder="请输入IP" v-model="AddServiceFrom.c_ip"></el-input>
                </el-form-item>
                <el-form-item label="port" prop="c_port">
                    <el-input type="text" placeholder="请输入端口" v-model="AddServiceFrom.c_port"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="c_remake">
                    <el-input type="text" placeholder="" v-model="AddServiceFrom.c_remake"></el-input>
                </el-form-item>
            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>
            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="AddBugs">提 交</el-button>
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
        props:['visible'],
        data() {
            return {
                add_visible: this.visible,
                re_data: '',
                r_result: {
                    flag: false,
                },

                AddServiceFrom: {

                    c_ip:"",
                    c_port:"",
                    c_filename:"",

                },

                // 增加实例规则
                addrules: {

                    c_ip: [
                        {
                            required: true, message: 'IP不能为空.', trigger: 'blur'
                        }
                    ],

                    c_port: [
                        {
                            required: true, message: '端口不能为空', trigger: 'blur'
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
                this.$refs['AddServiceFrom'].resetFields()
            },

            Cancel(){
                this.$refs['AddServiceFrom'].resetFields();
                this.add_visible = false;
            },

            AddBugs(){
                let that = this;
                axios({
                    method:'post',
                    url:'/api/configuration/cfg_add',
                    data: {
                        c_ip: this.AddServiceFrom.c_ip,
                        c_port: this.AddServiceFrom.c_port,
                        c_remake: this.AddServiceFrom.c_remake,
                    }
                }).then(function(resp){
                    that.$refs['AddServiceFrom'].resetFields();
                    that.re_data = resp.data;
                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    that.re_data = resp.data
                });
            },

        }}
</script>
