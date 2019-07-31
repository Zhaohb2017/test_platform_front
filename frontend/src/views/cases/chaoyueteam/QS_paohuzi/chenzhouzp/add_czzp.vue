<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加测试用例 - 郴州字牌"
                width="60%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="AddCaseForm" :model="AddCaseForm" :rules='addrules' label-width="80px">

                <el-form-item label="日 期" prop="c_date">
                    <el-date-picker type="date" style="width: 100%;" placeholder="选择日期" v-model="AddCaseForm.c_date"></el-date-picker>
                </el-form-item>

                <el-form-item label="提 交 人" prop="c_name">
                    <el-input type="text" placeholder="请输入提交人信息" v-model="AddCaseForm.c_name"></el-input>
                </el-form-item>
                <el-form-item label="用户mid" prop="c_mid">
                    <el-input type="text" placeholder="请输入用户mid" v-model="AddCaseForm.c_mid"></el-input>
                </el-form-item>

                <el-form-item label="测试目的" prop="c_purpose">
                    <el-input type="text" placeholder="请输入测试目的" v-model="AddCaseForm.c_purpose"></el-input>
                </el-form-item>

                <el-form-item label="创房选项" width="290" min-width="180" header-align="center" prop="c_options">
                    <el-card class="box-card">
                        <div>
                            <template>
                                <span>人数：</span>
                                <el-radio-group v-model="AddCaseForm.c_options.o_player" @change="getValue">
                                    <el-radio :label=2>二人</el-radio>
                                    <el-radio :label=3>三人</el-radio>
                                </el-radio-group>
                            </template>
                        </div>
                        <div v-show="ShowFlag">
                            <template>
                                <span>玩法：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_card_num" label='抽牌20张'>抽牌20张</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_card_num" label='不抽底牌'>不抽底牌</el-radio>
                            </template>
                        </div>
<!--                       选择局数,2,3人通用 -->
                        <div>
                            <template>
                                <span>选择局数：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='5局'>5局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='10局'>10局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='20局'>20局</el-radio>
                            </template>
                        </div>
                        <div>
                            <template>
                                <span>请选择玩法：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_huyideng" label='5息一囤'>5息一囤</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_huyideng" label='3息一囤'>3息一囤</el-radio>
                                <el-checkbox v-model="AddCaseForm.c_options.o_jiachui" :label=512>加锤</el-checkbox>
                            </template>
                        </div>
                    </el-card>
                </el-form-item>

                <el-form-item label="牌型数据" prop="c_cards">
                    <el-input type="textarea" autosize placeholder="请输入牌型数据" v-model="AddCaseForm.c_cards"></el-input>
                </el-form-item>

                <el-form-item label="操作步骤" prop="c_steps">



                    <el-input type="textarea" autosize placeholder="请输入操作步骤" v-model="AddCaseForm.c_steps"></el-input>
                </el-form-item>


                <el-form-item label="备注" prop="c_remake">
                    <el-input type="text" placeholder="请输入额外补充内容" v-model="AddCaseForm.c_remake"></el-input>
                </el-form-item>

            </el-form>
            <el-alert v-if="re_data != ''" type="error">{{ re_data }}</el-alert>

            <span slot="footer" class="dialog-footer">
          <el-button type="danger" @click="Cancel">取 消</el-button>
          <el-button type="danger" @click="RemoveData">清 除</el-button>
          <el-button type="primary" @click="AddCase">提 交</el-button>
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
        props:['visible'],
        data() {
            return {
                add_visible: this.visible,

                re_data: '',


                // 创房选项二人时显示抽牌标记位
                ShowFlag: false,

                options:[{
                    value: "不限分",
                    label: "不限分"
                }, {
                    value: "低于5分",
                    label: "低于5分"
                }, {
                    value: "低于10分",
                    label: "低于10分"
                }, {
                    value: "低于15分",
                    label: "低于15分"
                }, {
                    value: "低于20分",
                    label: "低于20分"
                }, {
                    value: "低于25分",
                    label: "低于25分"
                }, {
                    value: "低于30分",
                    label: "低于30分"
                }, {
                    value: "低于35分",
                    label: "低于35分"
                }, {
                    value: "低于40分",
                    label: "低于40分"
                }, {
                    value: "低于45分",
                    label: "低于45分"
                }, {
                    value: "低于50分",
                    label: "低于50分"
                }, {
                    value: "低于55分",
                    label: "低于55分"
                }, {
                    value: "低于60分",
                    label: "低于60分"
                }, {
                    value: "低于65分",
                    label: "低于65分"
                }, {
                    value: "低于70分",
                    label: "低于70分"
                }, {
                    value: "低于75分",
                    label: "低于75分"
                }, {
                    value: "低于80分",
                    label: "低于80分"
                }, {
                    value: "低于85分",
                    label: "低于85分"
                }, {
                    value: "低于90分",
                    label: "低于90分"
                }, {
                    value: "低于95分",
                    label: "低于95分"
                }, {
                    value: "低于100分",
                    label: "低于100分"
                }],

                AddCaseForm: {
                    c_project: '超越项目组',
                    c_version: '主版本',
                    c_play: '郴州字牌',
                    c_date: '',
                    c_name: '',
                    c_mid:"",
                    c_purpose: '',
                    c_options: {
                        o_player: 3,
                        o_round: 10,
                        o_huyideng: '5息一囤',
                        o_jiachui: '',
                        o_card_num: '抽牌20张',
                        o_wanfa: '',
                        o_integral: '',
                        o_NoShow_dipai: "",
                    },
                    c_steps: '',
                    c_cards: '',
                    c_remake: '',
                },

                // 增加实例规则
                addrules: {
                    c_date: [
                        {
                            required: true, message: '日期不能不选.', trigger: 'blur'
                        },
                    ],

                    c_name: [
                        {
                            required: true, message: '提交人不能为空.', trigger: 'blur'
                        }
                    ],
                    c_mid: [
                        {
                            required: true, message: '用户mid不能为空.', trigger: 'blur'
                        }
                    ],

                    c_type: [
                        {
                            required: true, message: 'Bug类型不能不选.', trigger: 'blur'
                        }
                    ],

                    c_result: [
                        {
                            required: true, message: 'Bug直接导致结果不能为空.', trigger: 'blur'
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
            Closeed(){
                this.add_visible = false;
            },

            handleClose(done) {
                this.Closeed();
            },

            RemoveData(){
                this.$refs['AddCaseForm'].resetFields()
            },

            Cancel(){
                this.$refs['AddCaseForm'].resetFields()
                this.add_visible = false;
            },

            handleUpdateDoubelOptions(){
                console.log("xxx")
            },

            getValue(val){
                if(val==2){
                    this.ShowFlag = true;
                }else{
                    this.ShowFlag = false;
                }
            },

            AddCase(){
                if(this.$store.state.user != null){
                    if(this.AddCaseForm.c_date == ''){
                        this.$message.error("日期不能为空.")
                        return
                    }

                    if(this.AddCaseForm.c_name == ''){
                        this.$message.error("提交人不能为空.")
                        return
                    }


                    if(this.AddCaseForm.c_purpose == ''){
                        this.$message.error("测试目的不能为空.")
                        return
                    }

                    if(this.AddCaseForm.c_cards == ''){
                        this.$message.error("做牌数据不能为空.")
                        return
                    }

                    if(this.AddCaseForm.c_steps == ''){
                        this.$message.error("操作步骤不能为空.")
                        return
                    }

                    let that = this;
                    if(this.AddCaseForm.c_options.o_player == 3){
                        var options = {
                            '人数': this.AddCaseForm.c_options.o_player,
                            '局数': this.AddCaseForm.c_options.o_round,
                            '胡一等': this.AddCaseForm.c_options.o_huyideng,
                        }
                    }else{
                        options["牌数"] = this.AddCaseForm.c_options.o_card_num
                    }

                    if(this.AddCaseForm.c_options.o_wanfa != ""){
                        options["玩法"] = this.AddCaseForm.c_options.o_wanfa
                    }

                    console.log(options)

                    axios({
                        method:'post',
                        url:'/api/cases/c_add',
                        data: {
                            c_cards: this.AddCaseForm.c_cards,
                            c_date: this.AddCaseForm.c_date,
                            c_name: this.AddCaseForm.c_name,
                            c_purpose: this.AddCaseForm.c_purpose,
                            c_account:this.AddCaseForm.c_mid,
                            c_remake: this.AddCaseForm.c_remake,
                            c_steps: this.AddCaseForm.c_steps,
                            c_project: this.AddCaseForm.c_project + '-' + this.AddCaseForm.c_version,
                            c_play: this.AddCaseForm.c_play,
                            c_options: options,
                        }
                    }).then(function(resp){
                        that.$refs['AddCaseForm'].resetFields()
                        that.re_data = resp.data
                        setTimeout(() => {
                            that.$emit("reload")
                        }, 800);
                    }).catch(resp => {
                        that.re_data = resp.data
                    });
                }else{
                    this.$message.error("请先登录")
                }

            },
        },
    }
</script>
