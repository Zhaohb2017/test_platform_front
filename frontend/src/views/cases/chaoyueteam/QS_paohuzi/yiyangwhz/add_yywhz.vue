<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加测试用例 - 益阳歪胡子"
                width="40%"
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
                                    <el-radio :label=4>少人模式</el-radio>
                                </el-radio-group>
                            </template>
                        </div>
                        <!-- 2人and少人模式玩法选项-->
                        <div v-show="ShowFlag">
                            <template>
                                <span>抽牌：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_card_num" label='抽牌20张'>抽牌20张</el-radio>

                                <el-radio v-model="AddCaseForm.c_options.o_card_num" label='不抽底牌'>不抽底牌</el-radio>
                            </template>
                        </div>

                        <div >
                            <template>
                                <span>局数：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='6'>6局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='8'>8局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='10'>10局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='16'>16局</el-radio>
                            </template>
                        </div>

                        <div>
                            <template>
                                <span>玩法：</span>
                                <el-checkbox v-model="AddCaseForm.c_options.o_qianghu" :label=1>全名堂</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_daixiaozihu" :label=2>大小字胡</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_tianhubaoting" :label=3>天胡报听</el-checkbox>


                            </template>

                        </div>

                        <div>
                            <template>
                                <span>封顶：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='1'>100胡</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='2'>200胡</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='3'>300胡</el-radio>


                            </template>
                        </div>
                        <div>
                            <template>
                                <div v-show="ShowFlag">
                                    <span>积分加倍：</span>
                                    <el-radio-group v-model="AddCaseForm.c_options.o_double" @change="double">
                                        <el-radio :label=1>加倍</el-radio>
                                        <el-radio :label=0>不加倍</el-radio>
                                    </el-radio-group>
                                </div>
                            </template>
                        </div>

                        <div v-show="doubleShowFlag">
                            <!-- 5分倍数加倍分输入                           -->
                            <template>
                                <el-input type="textarea" autosize placeholder="请输入5的倍数分" v-model="AddCaseForm.c_options.o_double_score"></el-input>
                            </template>
                            <!--    翻倍玩法    -->
                            <template>
                                <span>翻倍：</span>
                                <el-radio-group v-model="AddCaseForm.c_options.o_double_plus" >
                                    <el-radio :label=2>翻2倍</el-radio>
                                    <el-radio :label=3>翻3倍</el-radio>
                                    <el-radio :label=4>翻4倍</el-radio>
                                </el-radio-group>
                                <el-checkbox v-model="AddCaseForm.c_options.o_double_plus_new" :label=5 @change="doublePlusNew">添加新的翻倍</el-checkbox>
                            </template>
                        </div>
                        <div v-show="doublePlusNewShowFlag">
                            <!-- 添加新的翻倍选项 -->
                            <template>
                                <span>请设置新的翻倍积分： 5 分 至</span>
                                <el-input-number v-model="AddCaseForm.c_options.o_doublePlusNewScore"
                                                 @change="handleChange"
                                                 :min="5"
                                                 :max="100"
                                                 label="添加翻倍分数"
                                                 :step="5"
                                                 controls="true"></el-input-number><br>
                            </template>
                            <template>

                                <span>请设置新的翻倍数：</span>
                                <el-radio-group v-model="AddCaseForm.c_options.o_double_plus_score" >
                                    <el-radio :label=2>翻2倍</el-radio>
                                    <el-radio :label=3>翻3倍</el-radio>
                                    <el-radio :label=4>翻4倍</el-radio>
                                </el-radio-group>

                            </template>
                        </div>
                        <div>
                            <template>
                                <span>起胡：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_qihu" label='6'>6胡起胡</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_qihu" label='2'>7胡起胡</el-radio>

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
    .el-input-number{

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
                // 创房间选项时3人显示
                threePeople: false,
                //加倍选项标记
                doubleShowFlag:false,
                // 添加新的翻倍积分标记
                doublePlusNewShowFlag:false,

                AddCaseForm: {
                    c_project: '超越项目组',
                    c_version: '主版本',
                    c_play: '益阳歪胡子',
                    c_date: '',
                    c_name: '',
                    c_purpose: '',
                    c_options: {
                        o_player: 3,

                        o_double:0,         //是否加倍
                        o_double_score:'',   //倍数分数
                        o_doublePlusNewScore:100, //设置新的翻倍积分数据
                        o_double_plus_new: 0,
                        o_double_plus_score: '', //请设置新的翻倍数
                        o_round: 10,        //局数
                        o_quanmingtang: '',             //全名堂
                        o_difen:'1',        //底分
                        o_daixiaozihu:'',         //大小字胡
                        o_tianhubaoting:"", //天胡报听
                        o_fengding:"1",  //封顶
                        o_qihu:"6",      //起胡

                        o_huyideng: '5息一囤',

                        o_card_num: '抽牌20张',
                        o_wanfa: '',
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

            getValue(val){
                if(val==2 || 4){
                    this.ShowFlag = true;
                    this.threePeople= false;
                }else{
                    this.ShowFlag= false;
                    this.threePeople= true;// 3人玩法标记
                }
            },
            // 加倍选项判断
            double(val){
                if(val==1){
                    this.doubleShowFlag = true;
                }else {
                    this.doubleShowFlag = false;
                    this.AddCaseForm.c_options.o_double_plus_new = 0;
                }
            },
            // 添加新的翻倍积分选项
            doublePlusNew(score){
                if(score==true){
                    this.doublePlusNewShowFlag = true;
                }else {
                    this.doublePlusNewShowFlag = false;
                }
            },
            // 添加新的积分翻倍
            handleChange(){},

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
                            c_account: this.AddCaseForm.c_mid,
                            c_purpose: this.AddCaseForm.c_purpose,
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
