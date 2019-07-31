<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑测试用例 - 邵阳剥皮"
                width="30%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="editCaseForm" :model="editCaseForm" label-width="80px">
                <el-table-column prop="c_id" v-if="false">
                </el-table-column>

                <el-table-column prop="c_project" v-if="false">
                </el-table-column>

                <el-table-column prop="c_play" v-if="false">
                </el-table-column>

                <el-table-column prop="c_is_local" v-if="false">
                </el-table-column>

                <el-table-column prop="c_file_name" v-if="false">
                </el-table-column>

                <el-form-item label="日 期" prop="c_date">
                    <el-date-picker type="text" style="width: 100%;" disabled placeholder="选择日期" v-model="editCaseForm.c_date"></el-date-picker>
                </el-form-item>

                <el-form-item label="提 交 人" prop="c_name">
                    <el-input type="text" placeholder="请输入提交人信息" disabled v-model="editCaseForm.c_name"></el-input>
                </el-form-item>

                <el-form-item label="测试目的" prop="c_purpose">
                    <el-input type="text" placeholder="请输入测试目的"  v-model="editCaseForm.c_purpose"></el-input>
                </el-form-item>

                <el-form-item label="创房选项" width="290" min-width="180" header-align="center" prop="c_option">
                    <el-card class="box-card">
                        <div>
                            <template>
                                <span>人数：</span>
                                <el-radio-group v-model="editCaseForm.c_option.o_player" @change="getValue">
                                    <el-radio :label=2>二人</el-radio>
                                    <el-radio :label=3>三人</el-radio>
                                </el-radio-group>
                            </template>
                        </div>

                        <div v-show="ShowFlag">
                            <template>
                                <span>抽牌：</span>
                                <el-radio v-model="editCaseForm.c_option.o_card_num" label='抽牌20张'>抽牌20张</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_card_num" label='不抽底牌'>不抽底牌</el-radio>
                            </template>
                        </div>

                        <div>
                            <template>
                                <span>局数：</span>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=5>5局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=10>10局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=20>20局</el-radio>
                            </template>
                        </div>

                        <div>
                            <template>
                                <span>玩法：</span>
                                <el-radio v-model="editCaseForm.c_option.o_huyideng" label='5息一囤'>5息一囤</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_huyideng" label='3息一囤'>3息一囤</el-radio>
                            </template>
                        </div>

                        <div>
                            <template>
                                <span>玩法：</span>
                                <!-- `checked` 为 true 或 false -->
                                <el-checkbox v-model="editCaseForm.c_option.o_jiachui" :label=512>加锤</el-checkbox>
                            </template>
                        </div>

                    </el-card>
                </el-form-item>

                <el-form-item label="牌型数据" prop="c_cards">
                    <el-input type="textarea" autosize placeholder="请输入牌型数据" v-model="editCaseForm.c_cards"></el-input>
                </el-form-item>

                <el-form-item label="操作步骤" prop="c_operate">
                    <el-input type="textarea" autosize placeholder="请输入操作步骤" v-model="editCaseForm.c_operate"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="c_remake">
                    <el-input type="text" placeholder="请输入额外补充内容" v-model="editCaseForm.c_remake"></el-input>
                </el-form-item>
                <!-- <el-input type="text" placeholder="选择是否解决" v-model="editCaseForm.c_solve"></el-input> -->
            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="EditBugs">提 交</el-button>
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

</style>


<script>
    import axios from 'axios'
    export default {
        props:['visible', 'current_data'],
        data() {
            return {
                edit_visible: this.visible,
                re_data: '',

                ShowFlag: false,

                editCaseForm: {
                    c_project: '超越项目组',
                    c_version: '主版本',
                    c_play: '邵阳字牌',
                    c_date: '',
                    c_name: '',
                    c_purpose: '',
                    c_option: {},
                    // c_option: {
                    //     o_player: 3,
                    //     o_round: 10,
                    //     o_huyideng: '5息一囤',
                    //     o_jiachui: '',
                    //     o_card_num: '抽牌20张',
                    //     o_wanfa: '',
                    // },
                    c_cards: '',
                    c_operate: '',
                    c_remake: '',
                },

            };
        },

        mounted() {
            if(this.current_data){
                this.editCaseForm = this.current_data
                // console.log("c_purpose", this.editCaseForm.c_purpose)
                // let data = this.current_data.c_option.replace("人数", "o_player").replace("局数", "o_round").replace("胡一等", "o_huyideng").replace("牌数", "o_card_num").replace("玩法", "o_wanfa")
                // this.editCaseForm.c_option = data

                if(this.editCaseForm.c_option.o_player == 2){
                    this.ShowFlag=true;
                }else{
                    this.ShowFlag=false;
                }

            }
        },

        // 监听弹窗可视
        watch:{
            visible(val){
                this.edit_visible = val
            },
            edit_visible(val){
                this.$emit('update:visible', val)
            }
        },

        methods: {
            Closeed(){
                this.edit_visible = false;
            },

            handleClose(done) {
                this.Closeed();
            },

            RemoveData(){
                this.$refs['editCaseForm'].resetFields()
            },

            Cancel(){
                this.$refs['editCaseForm'].resetFields()
                this.edit_visible = false;
                this.$emit("reload")
            },

            getValue(val){
                if(val==2){
                    this.ShowFlag = true;
                }else{
                    this.ShowFlag = false;
                }
            },

            EditBugs(){
                let that = this;
                axios({
                    method:'post',
                    url:'/api/cases/c_edit',
                    data: {
                        c_id: this.editCaseForm.c_id,
                        c_date: this.editCaseForm.c_date,
                        c_name: this.editCaseForm.c_name,
                        c_play: this.editCaseForm.c_play,
                        c_purpose: this.editCaseForm.c_purpose,
                        c_option: this.editCaseForm.c_option,
                        c_operate: this.editCaseForm.c_operate,
                        c_cards: this.editCaseForm.c_cards,
                        c_remake: this.editCaseForm.c_remake,
                        c_file_name: this.editCaseForm.c_file_name,
                        c_is_local: this.editCaseForm.c_is_local,
                        c_project: this.editCaseForm.c_project,
                    }
                }).then(function(resp){
                    that.$refs['editCaseForm'].resetFields()
                    that.re_data = '修改成功.'
                    setTimeout(() => {
                        that.$emit("reload")
                    }, 800);
                }).catch(resp => {
                    that.re_data = resp.data
                });
            },


        },
    }
</script>
