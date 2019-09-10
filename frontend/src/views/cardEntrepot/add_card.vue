<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加牌数据"
                width="30%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="AddCardFrom" :model="AddCardFrom" :rules='addrules' label-width="80px">

                <el-form-item label="版本" prop="c_vsersion">
                    <div>
                        <template>
                            <template>
                                <el-select v-model="AddCardFrom.c_vsersion" placeholder="请选择" >
                                    <el-option
                                            v-for="item in vsersionType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </template>
                    </div>
                </el-form-item>
                <el-form-item label="玩法" prop="c_gameMethod">
                    <el-input type="text" placeholder="请输入什么玩法" v-model="AddCardFrom.c_gameMethod"></el-input>
                </el-form-item>
                <el-form-item label="牌数据" prop="c_gameCard">
                    <el-input type="text" placeholder="请输入json格式数据" v-model="AddCardFrom.c_gameCard"></el-input>
                </el-form-item>
                <el-form-item label="功能" prop="c_remark">
                    <el-input type="text" placeholder="功能介绍" v-model="AddCardFrom.c_remark"></el-input>
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
    import ElSelectDropdown from "element-ui/packages/select/src/select-dropdown";
    export default {
        components: {ElSelectDropdown},
        props:['visible'],
        data() {
            return {
                add_visible: this.visible,
                re_data: '',
                r_result: {
                    flag: false,
                },
                vsersionType:[{text:'牵手跑胡子',value:'牵手跑胡子'},{text:'牵手湖南麻将',value:'牵手湖南麻将'}],
                AddCardFrom: {
                    c_vsersion:"",
                    c_gameMethod:"",
                    c_gameCard:null,
                    c_remark:"",
                },

                // 增加实例规则
                addrules: {

                    c_gameMethod: [
                        {
                            required: true, message: '玩法不能为空.', trigger: 'blur'
                        }
                    ],
                    c_vsersion: [
                        {
                            required: true, message: '版本不能为空.', trigger: 'blur'
                        }
                    ],

                    c_gameCard: [
                        {
                            required: true, message: '牌数据不能为空', trigger: 'blur'
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
                this.$refs['AddCardFrom'].resetFields()
            },

            Cancel(){
                this.$refs['AddCardFrom'].resetFields();
                this.add_visible = false;
            },

            AddBugs(){
                let that = this;
                axios({
                    method:'post',
                    url:'/api/addcard/c_add',
                    data: {
                        c_vsersion: this.AddCardFrom.c_vsersion,
                        c_gameMethod: this.AddCardFrom.c_gameMethod,
                        c_gameCard: this.AddCardFrom.c_gameCard,
                        c_remark: this.AddCardFrom.c_remark,
                    }
                }).then(function(resp){
                    that.$refs['AddCardFrom'].resetFields();
                    if(resp.data == "请输入json格式数据"){
                        alert(resp.data)
                    }else{
                        console.log(222222222222222)
                        that.re_data = resp.data;
                    }

                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    that.re_data = resp.data
                });
            },

    }}
</script>
