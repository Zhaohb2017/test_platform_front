<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加测试用例 - 衡阳十胡卡"
                width="40%"
                center
                :show-close = "false"
                :modal-append-to-body="false"
                @closed="Closeed"
                :visible="true">

            <el-form ref="AddCaseForm" :model="AddCaseForm" :rules='addrules' label-width="80px">

                <el-form-item label="日 期" prop="c_date">
                    <el-date-picker type="datetime" style="width: 100%;" placeholder="选择日期" v-model="AddCaseForm.c_date"></el-date-picker>
                </el-form-item>


                <el-form-item label="用户mid" prop="c_mid">
                    <el-input type="text" placeholder="输入mid,例:[127843,127641,127854]" v-model="AddCaseForm.c_mid"></el-input>
                </el-form-item>
                <el-form-item label="测试目的" prop="c_purpose">
                    <el-input type="text" placeholder="请输入测试目的" v-model="AddCaseForm.c_purpose"></el-input>
                </el-form-item>

                <el-form-item label="创房选项" width="290" min-width="180" header-align="center" prop="c_options">
                    <el-card class="box-card">
                        <div>
                            <template>
                                <span>创房类型选择：&ensp;&ensp;&ensp;&ensp;&ensp;&ensp;</span>
                                <template>
                                    <el-select v-model="AddCaseForm.c_options.roomTypeVuale" placeholder="请选择" @change="createRoomType">
                                        <el-option
                                                v-for="item in roomType"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </template>
                        </div>

                        <div v-show="show_club_id">
                            <span>俱乐部房间类型选择：</span>
                            <el-input type="text" placeholder="请输入俱乐部ID" v-model="AddCaseForm.c_options.o_club_id"></el-input>
                            <template>

                                <el-select v-model="AddCaseForm.c_options.clubRoomTypeVuale" placeholder="请选择">
                                    <el-option
                                            v-for="item in clubRoomType"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                    </el-option>
                                </el-select>
                            </template>
                        </div>
                        <div>
                            <!-- 人数 -->
                            <template>
                                <span>人数：</span>
                                <el-radio-group v-model="AddCaseForm.c_options.o_player" @change="getValue">
                                    <el-radio :label=2>2人</el-radio>
                                    <el-radio :label=3>3人</el-radio>
                                    <el-radio :label=4>少人模式</el-radio>
                                </el-radio-group>
                            </template>
                        </div>
                        <!--2人玩法显示 -->
                        <div v-show="ShowFlag">
                            <template>
                                <span>抽牌：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_chou_card" label='20'>抽牌20张</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_chou_card" label='0'>不抽底牌</el-radio>
                            </template>
                        </div>

                        <div v-show="ShowFlag">
                            <template>
                                <span>积分加倍：</span>
                                <el-radio-group v-model="AddCaseForm.c_options.o_double" @change="double">
                                    <el-radio  :label=0>不加倍</el-radio>
                                    <el-radio  :label=1>加倍</el-radio>
                                </el-radio-group>
                            </template>
                        </div>

                        <!-- 加倍选项  -->
                        <div v-show="doubleShowFlag">
                            <!-- 5分倍数加倍分输入  -->
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

                        <div v-show="ShowFlag">
                            <template>
                                <span>选择张数:</span>
                                <el-radio v-model="AddCaseForm.c_options.o_cards_num" label='21张'>21张</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_cards_num" label='15张'>15张</el-radio>
                            </template>

                        </div>
                        <!--  3人玩法显示-->
                        <div v-show="threeFlag">
                            <template>
                                <span>选择张数:</span>
                                <el-radio v-model="AddCaseForm.c_options.o_cards_num" label='21张'>21张</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_cards_num" label='15张'>15张</el-radio>


                            </template>

                        </div>
                        <!--通用玩法选项-->
                        <div>
                            <template>
                                <span>请选择翻醒：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_fanxing" label='不带醒'>不带醒</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fanxing" label='翻醒'>翻醒</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fanxing" label='随醒'>随醒</el-radio>
                            </template>
                        </div>
                        <div>
                            <template>
                                <span>请选择局数：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='6'>6局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='8'>8局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='10'>10局</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_round" label='16'>16局</el-radio>
                            </template>
                        </div>
                        <div>
                            <template>
                                <span>默认玩法选项：</span>
                                <el-radio v-model="AddCaseForm.c_options.o_tunshu" label='3息1囤'>3息1囤</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_tunshu" label='1息1囤'>1息1囤</el-radio>
                            </template>
                            <template>
                                <el-radio v-model="AddCaseForm.c_options.o_qihu" label='6息起胡'>6息起胡</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_qihu" label='9息起胡'>9息起胡</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_qihu" label='15息起胡'>15息起胡</el-radio>
                            </template>
                            <template>
                                <el-radio v-model="AddCaseForm.c_options.o_hu_pao" label='有胡必胡'>有胡必胡</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_hu_pao" label='点炮必胡'>点炮必胡</el-radio>
                            </template>
                        </div>
                        <div>
                            <template>
                                <span>请选择玩法：</span>
                                <el-checkbox v-model="AddCaseForm.c_options.o_mingwei" :label=512>明偎</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_difen" :label=512>底分2分</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_yiwushi" :label=512>一五十</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_red_black" :label=512>红黑点</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_hu_public" :label=512>可胡示众牌</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_piaohu" :label=512>飘胡</el-checkbox>
                                <el-checkbox v-model="AddCaseForm.c_options.o_tdhdh" :label=512>天地海底胡</el-checkbox>
                            </template>
                        </div>
                        <div>
                            <template>
                                <span>请选择封顶:</span>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='不封顶'>不封顶</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='单局30封顶'>单局30封顶</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='单局60封顶'>单局60封顶</el-radio>
                                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='单局90封顶'>单局90封顶</el-radio>
                            </template>
                        </div>

                    </el-card>
                </el-form-item>

                <el-form-item label="牌型数据" prop="c_cards">
                    <el-input type="textarea" autosize placeholder="请输入牌型数据" v-model="AddCaseForm.c_cards"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="c_remake">
                    <el-input type="text" placeholder="请输入额外补充内容" v-model="AddCaseForm.c_remake"></el-input>
                </el-form-item>

            </el-form>
            <el-form :model="operationForm"
                     ref="operationForm"
                     label-width="80px"
                     center
                     size="small">
                <el-form-item label="测试步骤"  prop="servin" >
                    <el-button type="primary" @click="addRow(operationList)">新增</el-button>
                    <template>
                        <el-table border :data="operationList" style="width: 100%" >
                            <el-table-column prop="user" label="玩家" style="width:6vw;" >
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.users" clearable  >
                                        <el-option
                                                v-for="item in users"
                                                :key="item.value"
                                                :label="item.text"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column  prop="operation" label="类型">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.operation" clearable  >
                                        <el-option
                                                v-for="item in operation_type"
                                                :key="item.value"
                                                :label="item.text"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column prop="card" label="牌">
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.card" multiple clearable placeholder="请选择牌型" v-show="getOption(operationList[scope.$index].operation) === true" >
                                        <el-option
                                                v-for="item in card_type"
                                                :key="item.value"
                                                :label="item.text"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </template>
                            </el-table-column>
                            <el-table-column fixed="right"  label="操作">
                                <template slot-scope="scope">
                                    <el-button @click.native.prevent="deleteRow(scope.$index, operationList)" size="small"> 移除 </el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </template>
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

                // 创房间是抽牌标记(2人和少人模式)
                chouCard: false,
                operationList:[],
                operation_type:[{text:'胡牌',value:'胡牌'},
                    {text:'碰牌',value:'碰牌'},
                    {text:'吃牌',value:'吃牌'},
                    {text:'出牌',value:'出牌'},
                    {text:'过牌',value:'过牌'},
                ],
                operation_list:['碰牌', '吃牌', '出牌'],
                card_type:[
                    {
                        text: '1s',
                        value: '1s'
                    },
                    {
                        text: '2s',
                        value: '2s'
                    },          {
                        text: '3s',
                        value: '3s'
                    },
                    {
                        text: '4s',
                        value: '4s'
                    },
                    {
                        text: '5s',
                        value: '5s'
                    },
                    {
                        text: '6s',
                        value: '6s'
                    },
                    {
                        text: '7s',
                        value: '7s'
                    },
                    {
                        text: '8s',
                        value: '8s'
                    },
                    {
                        text: '9s',
                        value: '9s'
                    },
                    {
                        text: 'Ts',
                        value: 'Ts'
                    },
                    {
                        text: '1b',
                        value: '1b'
                    },
                    {
                        text: '2b',
                        value: '2b'
                    },
                    {
                        text: '3b',
                        value: '3b'
                    },
                    {
                        text: '4b',
                        value: '4b'
                    },
                    {
                        text: '5b',
                        value: '5b'
                    },
                    {
                        text: '6b',
                        value: '6b'
                    },
                    {
                        text: '7b',
                        value: '7b'
                    },
                    {
                        text: '8b',
                        value: '8b'
                    },
                    {
                        text: '9b',
                        value: '9b'
                    },
                    {
                        text: 'Tb',
                        value: 'Tb'
                    },

                ],
                users:[{text:'玩家1',value:'玩家1'},{text:'玩家2',value:'玩家2'},{text:'玩家3',value:'玩家3'}],
                roomType:[{text:'普通创房',value:'普通创房'},{text:'俱乐部创房',value:'俱乐部创房'}],
                clubRoomType:[{text:'金币创房',value:'金币创房'}],
                operationForm:{},
                //创建房间3人玩法显示标记
                threeFlag:false,
                //加倍选项标记
                doubleShowFlag:false,
                //新设置翻倍积分标记
                doublePlusNewShowFlag:false,
                show_club_id:false,
                roomType:[{text:'普通创房',value:'普通创房'},{text:'俱乐部创房',value:'俱乐部创房'}],
                clubRoomType:[{text:'金币创房',value:'金币创房'}],
                AddCaseForm: {
                    c_project: '超越项目组',
                    c_version: '主版本',
                    c_play: '衡阳十胡卡',
                    c_date: '',
                    c_name: '',
                    c_mid:"",
                    c_purpose: '',
                    c_options: {
                        o_player: 3,
                        o_round: '6',
                        o_dianpao_hu: '',
                        o_dianpao_None: '',
                        o_fanxing:'不带醒',    //翻醒
                        o_tunshu: "3息1囤",    //囤数
                        o_qihu: "6息起胡",      //多少起胡
                        o_hu_pao: "有胡必胡",    //选择有胡比胡,点炮必胡
                        o_mingwei:'',           //明偎
                        o_difen:"",             //底分2分
                        o_yiwushi:"",           //一五十
                        o_red_black:"",         //红黑点
                        o_hu_public:"",         //可胡示众
                        o_piaohu:"",            //飘胡
                        o_tdhdh: "",            //天地海底胡
                        o_fengding:"不封顶",          //封顶选项
                        o_cards_num:'21张',         //选择张数
                        o_chou_card:'20',           //抽牌多少张
                        o_double: 0,               //加倍选项
                        o_double_score: '',         //加倍分数输入
                        o_doublePlusNewScore: '',   //新添加积分分数
                        o_huyideng: '5息一囤',
                        o_jiachui: '',
                        o_card_num: '抽牌20张',
                        roomTypeVuale:"普通创房",
                        clubRoomTypeVuale:'',
                        o_club_id:'',

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
            addRow(tableData,event){
                tableData.push({users: '',operation:'', card:''})
            },
            deleteRow(index, rows){
                ////删除改行
                rows.splice(index, 1);
            },
            RemoveData(){
                this.$refs['AddCaseForm'].resetFields()
            },
            getOption(val){
                for(var i in this.operation_list){
                    if (val === this.operation_list[i]){
                        return true
                    }
                }
            },
            Cancel(){
                this.$refs['AddCaseForm'].resetFields()
                this.add_visible = false;
            },
            createRoomType(val){
                console.log("xxxxxxx",val);
                if(val=="俱乐部创房"){
                    this.show_club_id = true;
                }else{
                    this.show_club_id = false;
                    this.AddCaseForm.c_options.clubRoomTypeVuale = '';
                    this.AddCaseForm.c_options.o_club_id = '';
                }
            },
            handleUpdateDoubelOptions(){
                console.log("xxx")
            },

            getValue(val){
                if(val==2 || 4){
                    this.ShowFlag = true;
                    this.threeFlag = false;
                    this.chouCard = true;    //抽牌
                    this.AddCaseForm.c_options.o_double = 0 //加倍重新赋值
                }
                if(val==3){
                    this.threeFlag = true;
                    this.ShowFlag = false;
                    this.doubleShowFlag = false;
                }
            },
            // 加倍选项判断
            double(val){
                if(val==1){
                    this.doubleShowFlag = true;
                }else {
                    this.doubleShowFlag = false;
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

            AddCase(){
                if(this.$store.state.user != null){
                    if(this.AddCaseForm.c_date == ''){
                        this.$message.error("日期不能为空.");
                        return

                    }

                    if(this.AddCaseForm.c_purpose == ''){
                        this.$message.error("测试目的不能为空.");
                        return

                    }

                    if(this.AddCaseForm.c_cards == ''){
                        this.$message.error("测试数据不能为空.");
                        return
                    }


                    let that = this;

                    axios({
                        method:'post',
                        url:'/api/cases/c_add',
                        data: {
                            c_cards: this.AddCaseForm.c_cards,
                            c_date: this.AddCaseForm.c_date,
                            c_name: this.$store.state.user,
                            c_purpose: this.AddCaseForm.c_purpose,
                            c_remake: this.AddCaseForm.c_remake,
                            c_account: this.AddCaseForm.c_mid,
                            c_steps: this.operationList,
                            c_project: this.AddCaseForm.c_project + '-' + this.AddCaseForm.c_version,
                            c_play: this.AddCaseForm.c_play,
                            c_options: this.AddCaseForm.c_options,
                        }
                    }).then(function(resp){
                        if (resp.data["code"]==300){
                            alert(resp.data["Msg"])
                        }else {
                            that.$refs['AddCaseForm'].resetFields();
                            alert(resp.data);
                            that.re_data = resp.data;
                            setTimeout(() => {
                                that.$emit("reload")
                            }, 800);

                        }
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
