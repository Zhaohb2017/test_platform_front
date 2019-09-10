<template>
    <div v-if="edit_visible" class="lg">
        <el-dialog
                title="编辑测试用例 - 常德跑胡子"
                width="50%"
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
                        <!-- 2人玩法选项-->
                        <div v-show="ShowFlag">
                            <template>
                                <span>抽牌：</span>
                                <el-radio v-model="editCaseForm.c_option.o_card_num" label='抽牌20张'>抽牌20张</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_card_num" label='抽牌10张'>抽牌10张</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_card_num" label='不抽底牌'>不抽底牌</el-radio>
                            </template>
                        </div>

                        <!-- 玩法   -->
                        <div>
                            <template>
                                <span>玩法：</span>
                                <el-radio v-model="editCaseForm.c_option.o_mingtang" label='全名堂'>全名堂</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_mingtang" label='红黑点'>红黑点</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_mingtang" label='多红对'>多红对</el-radio>
                                <el-checkbox v-model="editCaseForm.c_option.o_mingwei" :label=2>明偎</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_datuanyuan" :label=2>大团圆</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_xingxingxi" :label=2>行行息</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_shuahou" :label=2>耍猴</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_tinghu" :label=2>听胡</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_huangfanDouble" :label=2>黄番2倍</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_jiaxingxing" :label=2>假行行</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_siqihong" :label=2>四七红</el-checkbox>
                                <el-checkbox v-model="editCaseForm.c_option.o_yikuaibian" :label=2>一块匾</el-checkbox>
                            </template>
                        </div>
                        <div>
                            <template>
                                <span>底分：</span>
                                <el-radio v-model="editCaseForm.c_option.o_difen" :label=1>底分1分</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_difen" :label=2>底分2分</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_difen" :label=3>底分3分</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_difen" :label=4>底分4分</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_difen" :label=5>底分5分</el-radio>

                            </template>
                        </div>
                        <div >
                            <template>
                                <span>局数：</span>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=6>6局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=8>8局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=10>10局</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_round" :label=16>16局</el-radio>
                            </template>
                        </div>
                        <div >
                            <template>
                                <span>封顶：</span>
                                <el-radio v-model="editCaseForm.c_option.o_fengding" label=''>不封顶</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_fengding" label='100'>100封顶</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_fengding" label='200'>200封顶</el-radio>
                                <el-radio v-model="editCaseForm.c_option.o_fengding" label='300'>300封顶</el-radio>

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
                     label-width="130px"
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
                                    <el-input size="mini" v-model="scope.row.card"  ></el-input>
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

                // 创房选项二人时显示抽牌标记位
                ShowFlag: false,

                // 创房间是抽牌标记(2人和少人模式)
                chouCard: false,
                //创建房间3人玩法显示标记
                threeFlag:false,
                //加倍选项标记
                doubleShowFlag:false,
                //新设置翻倍积分标记
                doublePlusNewShowFlag:false,
                show_club_id:false,
                operationList:[],
                operation_type:[{text:'胡牌',value:'胡牌'},
                    {text:'碰牌',value:'碰牌'},
                    {text:'吃牌',value:'吃牌'},
                    {text:'出牌',value:'出牌'},
                    {text:'过牌',value:'过牌'},
                ],
                users:[{text:'玩家1',value:'玩家1'},{text:'玩家2',value:'玩家2'},{text:'玩家3',value:'玩家3'}],
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
                if(val==2 || 4){
                    this.ShowFlag = true;
                    this.threeFlag = false;
                    this.chouCard = true;    //抽牌
                    this.AddCaseForm.c_options.o_double = 0 //加倍重新赋值
                }else{
                    this.doublePlusNewShowFlag = false;
                    this.o_double_plus_new =false;
                    this.doubleShowFlag = false;
                    this.editCaseForm.c_option.o_double_plus = 0;
                    this.editCaseForm.c_option.o_doublePlusNewScore =0;
                    this.threeFlag = true;
                    this.ShowFlag = false;
                    this.doubleShowFlag = false;
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
            },


        },
    }
</script>
