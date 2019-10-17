<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">
            <el-form ref="editDataForm" :model="editDataForm"  label-width="80px">
                <el-form-item label="IP" prop="c_ip">
                    <el-input type="text" placeholder="请输入IP" v-model="editDataForm.t_ip"></el-input>
                </el-form-item>
                <el-form-item label="port" prop="c_port">
                    <el-input type="text" placeholder="请输入端口" v-model="editDataForm.t_port"></el-input>
                </el-form-item>
                <el-form-item label="备注" prop="c_remake">
                    <el-input type="text" placeholder="" v-model="editDataForm.t_remark"></el-input>
                </el-form-item>

            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="EditSkills">提 交</el-button>
        </span>
        </el-dialog>
    </div>
</template>

<style lang="less" scoped>
    .lg{
        text-align: center;
    }

    .el-input{
        float: left;
    }

    .el-cascader{
        width: 100%;
    }

    // 底部按钮居中
    .el-dialog__footer{
        text-align: center;
    }

    // 按钮样式
    .el-button{
        margin: 0 5%;
    }

    .text {
        font-size: 14px;
    }

    .item {
        margin-bottom: 18px;
    }

    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both
    }

    .box-card {
        width: 100%;
    }

</style>


<script>
    import axios from 'axios'
    export default {
        props:['visible', 'current_data'],
        data() {
            return {
                edit_visible: this.visible,
                re_data: '',
                editDataForm: {
                    id:"",
                    t_ip:"",
                    t_port:"",
                    t_remark:""
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

        mounted() {
            if(this.current_data){
                this.editDataForm.id = this.current_data.t_id;
                this.editDataForm.t_ip = this.current_data.t_ip;
                this.editDataForm.t_port = this.current_data.t_port;
                this.editDataForm.t_remark = this.current_data.t_remark;
            }

            },

        // 监听弹窗可视
        watch:{
            visible(val){
                this.edit_visible = val;
                console.log("监听弹窗可看: "+this.edit_visible );
            },
            edit_visible(val){
                this.$emit('update:visible', val)
            }
        },

        methods: {

            RemoveData(){
                this.$refs['editDataForm'].resetFields()
            },

            Cancel(){
                this.$refs['editDataForm'].resetFields();
                this.edit_visible = false;
                this.$emit("reload")
            },
            Closeed(){
                this.edit_visible = false;

            },

            EditSkills(){
                let that = this;
                
                axios({
                    method:'post',
                    url:'/api/configuration/cfg_update',
                    data: {
                        data: this.editDataForm
                    }
                }).then(function(resp){
                    that.$refs['editDataForm'].resetFields();
                    that.re_data = resp.data;
                    alert(resp.data);
                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    console.log("失败 .");
                    that.re_data = resp.data
                });
            },
        },
    }
</script>
