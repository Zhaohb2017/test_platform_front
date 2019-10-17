<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑测试用例 - 跑得快16張"
                width="60%"
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
                    <el-date-picker type="datetime"
                                    style="width: 100%;"
                                    disabled
                                    placeholder="选择日期"
                                    v-model="editCaseForm.c_date"></el-date-picker>
                </el-form-item>

                <el-form-item label="用户mid" prop="c_mid">
                    <el-input type="text" placeholder="输入用户mid" v-model="editCaseForm.c_mid"></el-input>
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
                        <div>
                            <template>
                                <div v-show="ShowFlag">
                                    <span>积分加倍：</span>
                                    <el-radio-group v-model="editCaseForm.c_option.o_double" @change="double">
                                        <el-radio :label=1>加倍</el-radio>
                                        <el-radio :label=0>不加倍</el-radio>
                                    </el-radio-group>
                                </div>
                            </template>
                        </div>

                        <div v-show="doubleShowFlag">
                            <!-- 5分倍数加倍分输入                           -->
                            <template>
                                <el-input type="textarea" autosize placeholder="请输入5的倍数分" v-model="editCaseForm.c_option.o_double_score"></el-input>
                            </template>
                            <!--    翻倍玩法    -->
                            <template>
                                <span>翻倍：</span>
                                <el-radio-group v-model="editCaseForm.c_option.o_double_plus" >
                                    <el-radio :label=2>翻2倍</el-radio>
                                    <el-radio :label=3>翻3倍</el-radio>
                                    <el-radio :label=4>翻4倍</el-radio>
                                </el-radio-group>
                                <el-checkbox v-model="editCaseForm.c_option.o_double_plus_new" :label=5 @change="doublePlusNew">添加新的翻倍</el-checkbox>
                            </template>
                        </div>
                        <div v-show="doublePlusNewShowFlag">
                            <!-- 添加新的翻倍选项 -->
                            <template>
                                <span>请设置新的翻倍积分： 5 分 至</span>
                                <el-input-number v-model="editCaseForm.c_option.o_doublePlusNewScore"
                                                 :min="5"
                                                 :max="100"
                                                 label="添加翻倍分数"
                                                 :step="5"
                                ></el-input-number><br>
                                <!--controls="true"-->
                            </template>
                            <template>

                                <span>请设置新的翻倍数：</span>
                                <el-radio-group v-model="editCaseForm.c_option.o_double_plus" >
                                    <el-radio :label=2>翻2倍</el-radio>
                                    <el-radio :label=3>翻3倍</el-radio>
                                    <el-radio :label=4>翻4倍</el-radio>
                                </el-radio-group>

                            </template>
                        </div>

                        <div>
                            <template>
                                <span>局数：</span>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=5>5局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=10>10局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=15>15局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=20>20局</el-radio>
                            </template>
                        </div>

                        <div>
                            <template>
                                <span>玩法：</span>
                                <el-checkbox v-model="editCaseForm.c_option.o_showCard" :label=512>显示剩余牌</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_zhuaNiao" :label=512>红桃10抓鸟</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_outBig" :label=512>有大必出</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_nonSeparability" :label=512>炸弹不可拆</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_gaiPai" :label=512>首轮盖牌</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_outThree" :label=512>首局先出黑桃3</el-checkbox>
                            </template>
                        </div>

                    </el-card>
                </el-form-item>

                <el-form-item label="牌型数据" prop="c_cards">
                    <el-input type="textarea" autosize placeholder="请输入牌型数据" v-model="editCaseForm.c_cards"></el-input>
                </el-form-item>

                <el-form-item label="备注" prop="c_remake">
                    <el-input type="text" placeholder="请输入额外补充内容" v-model="editCaseForm.c_remake"></el-input>
                </el-form-item>
                <!-- <el-input type="text" placeholder="选择是否解决" v-model="editCaseForm.c_solve"></el-input> -->
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
                                    <el-select v-model="scope.row.card" multiple placeholder="请选择牌型">
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
                showjiaochui:false,
                // 创房选项二人时显示抽牌标记位
                ShowFlag: false,
                show_club_id:false,
                //加倍选项标记
                doubleShowFlag:false,
                // 添加新的翻倍积分标记
                doublePlusNewShowFlag:false,
                // 添加新的翻倍积分标记
                doublePlusNewShowFlag:false,
                operationList:[],
                operation_type:[

                    {text:'出牌',value:'出牌'},
                    {text:'过牌',value:'过牌'},
                ],
                card_type:[

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
                        text: 'Js',
                        value: 'Js'
                    },
                    {
                        text: 'Qs',
                        value: 'Qs'
                    },
                    {
                        text: 'Ks',
                        value: 'Ks'
                    },
                    {
                        text: 'As',
                        value: 'As'
                    },
                    {
                        text: '2h',
                        value: '2h'
                    },          {
                        text: '3h',
                        value: '3h'
                    },
                    {
                        text: '4h',
                        value: '4h'
                    },
                    {
                        text: '5h',
                        value: '5h'
                    },
                    {
                        text: '6h',
                        value: '6h'
                    },
                    {
                        text: '7h',
                        value: '7h'
                    },
                    {
                        text: '8h',
                        value: '8h'
                    },
                    {
                        text: '9h',
                        value: '9h'
                    },
                    {
                        text: 'Th',
                        value: 'Th'
                    },
                    {
                        text: 'Jh',
                        value: 'Jh'
                    },
                    {
                        text: 'Qh',
                        value: 'Qh'
                    },
                    {
                        text: 'Kh',
                        value: 'Kh'
                    },
                    {
                        text: 'Ah',
                        value: 'Ah'
                    },
                    {
                        text: '2c',
                        value: '2c'
                    },          {
                        text: '3c',
                        value: '3c'
                    },
                    {
                        text: '4c',
                        value: '4c'
                    },
                    {
                        text: '5c',
                        value: '5c'
                    },
                    {
                        text: '6c',
                        value: '6c'
                    },
                    {
                        text: '7c',
                        value: '7c'
                    },
                    {
                        text: '8c',
                        value: '8c'
                    },
                    {
                        text: '9c',
                        value: '9c'
                    },
                    {
                        text: 'Tc',
                        value: 'Tc'
                    },
                    {
                        text: 'Jc',
                        value: 'Jc'
                    },
                    {
                        text: 'Qc',
                        value: 'Qc'
                    },
                    {
                        text: 'Kc',
                        value: 'Kc'
                    },
                    {
                        text: 'Ac',
                        value: 'Ac'
                    },
                    {
                        text: '2d',
                        value: '2d'
                    },          {
                        text: '3d',
                        value: '3d'
                    },
                    {
                        text: '4d',
                        value: '4d'
                    },
                    {
                        text: '5d',
                        value: '5d'
                    },
                    {
                        text: '6d',
                        value: '6d'
                    },
                    {
                        text: '7d',
                        value: '7d'
                    },
                    {
                        text: '8d',
                        value: '8d'
                    },
                    {
                        text: '9d',
                        value: '9d'
                    },
                    {
                        text: 'Td',
                        value: 'Td'
                    },
                    {
                        text: 'Jd',
                        value: 'Jd'
                    },
                    {
                        text: 'Qd',
                        value: 'Qd'
                    },
                    {
                        text: 'Kd',
                        value: 'Kd'
                    },
                    {
                        text: 'Ad',
                        value: 'Ad'
                    },


                ],
                users:[{text:'玩家1',value:'玩家1'},{text:'玩家2',value:'玩家2'},{text:'玩家3',value:'玩家3'},{text:'玩家4',value:'玩家4'}],
                roomType:[{text:'普通创房',value:'普通创房'},{text:'俱乐部创房',value:'俱乐部创房'}],
                clubRoomType:[{text:'金币创房',value:'金币创房'}],
                operationForm:{},
                editCaseForm: {
                },

            };
        },

        mounted() {
            if(this.current_data){
                this.editCaseForm = this.current_data;
                var dataObj = this.current_data.c_option;
                this.operationList = this.editCaseForm.c_operate;
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

            // 添加新的翻倍积分选项
            doublePlusNew(score){
                if(score==true){
                    this.doublePlusNewShowFlag = true;
                }else {
                    this.doublePlusNewShowFlag = false;
                }
            },
            ZhongMa(val){
                if (val==true){
                    this.editCaseForm.c_option.o_159zhongma = true;
                    this.editCaseForm.c_option.o_bankerzhongniao = false;

                }

            },
            BankerZhongNiao(val){
                if(val==true){
                    this.editCaseForm.c_option.o_159zhongma = false;
                    this.editCaseForm.c_option.o_bankerzhongniao = true;
                }
            },
            // 加倍选项判断
            double(val){
                if(val==1){
                    this.doubleShowFlag = true;
                }else {
                    this.doubleShowFlag = false;
                    this.doublePlusNewShowFlag = false;
                    this.editCaseForm.c_option.o_double_plus_new = false;
                }
            },
            qingyise(val){
                if(val==true){
                    this.editCaseForm.c_option.o_chi =false;
                }
            },
            Onchi(val){
                if(val==true){
                    this.editCaseForm.c_option.o_qingyisechi =false;
                }
            },

            addRow(tableData,event){
                tableData.push({users: '',operation:'', card:''})
            },
            deleteRow(index, rows){
                ////删除改行
                rows.splice(index, 1);
            },
            handleClose(done) {
                this.Closeed();
            },
            createRoomType(val){
                console.log("xxxxxxx",val);
                if(val=="俱乐部创房"){
                    this.show_club_id = true;
                }else{
                    this.show_club_id = false;
                    this.editCaseForm.c_option.clubRoomTypeVuale = '';
                    this.editCaseForm.c_option.o_club_id = '';
                }
            },
            RemoveData(){
                this.$refs['editCaseForm'].resetFields()
            },

            Cancel(){
                this.$refs['editCaseForm'].resetFields();
                this.edit_visible = false;
                this.$emit("reload")
            },

            getValue(val){
                if(val==2){
                    this.ShowFlag = true;
                }else{
                    this.doublePlusNewShowFlag = false;
                    this.o_double_plus_new =false;
                    this.ShowFlag = false;
                    this.doubleShowFlag = false;
                    this.editCaseForm.c_option.o_double_plus = 0;
                    this.editCaseForm.c_option.o_doublePlusNewScore =0;
                }
            },

            EditBugs(){
                if(this.$store.state.user != null){
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
                            c_operate: this.operationList,
                            c_cards: this.editCaseForm.c_cards,
                            c_remake: this.editCaseForm.c_remake,
                            c_file_name: this.editCaseForm.c_file_name,
                            c_is_local: this.editCaseForm.c_is_local,
                            c_project: this.editCaseForm.c_project,
                            c_account:this.editCaseForm.c_mid,
                        }
                    }).then(function(resp){
                        if (resp.data["code"]==300){
                            alert(resp.data["Msg"])
                        }else {
                            that.$refs['editCaseForm'].resetFields();
                            alert('编辑成功');

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
