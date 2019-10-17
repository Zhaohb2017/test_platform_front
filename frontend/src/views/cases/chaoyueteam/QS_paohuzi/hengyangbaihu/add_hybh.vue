<template>
    <div v-if="add_visible" class="lg">
        <el-dialog
                title="添加测试用例 - 衡阳百胡"
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
                            <template>
                                <span> 请选择封顶：</span>
                                <el-radio-group v-model="AddCaseForm.c_options.o_huxi">
                                    <el-radio :label=200>200息</el-radio>
                                    <el-radio :label=400>400息</el-radio>
                                </el-radio-group>
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
                            <el-table-column  prop="operation" label="类型" >
                                <template slot-scope="scope">
                                    <el-select v-model="scope.row.operation" clearable >
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
                ShowSelect:0,
                re_data: '',
                show_club_id:false,
                operationList:[],
                operation_list:['碰牌', '吃牌', '出牌'],
                operation_type:[{text:'胡牌',value:'胡牌'},
                    {text:'碰牌',value:'碰牌'},
                    {text:'吃牌',value:'吃牌'},
                    {text:'出牌',value:'出牌'},
                    {text:'过牌',value:'过牌'},
                ],
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
                integral_type:[
                    {text: '1', value: '1'},
                    {text: '2', value: '2'},
                    {text: '3', value: '3'},
                ],
                Fill_poles:[
                    {text: 'True', value: 'True'},
                    {text: 'False', value: 'False'},
                ],
                users:[{text:'玩家1',value:'玩家1'},{text:'玩家2',value:'玩家2'},{text:'玩家3',value:'玩家3'}],
                roomType:[{text:'普通创房',value:'普通创房'},{text:'俱乐部创房',value:'俱乐部创房'}],
                clubRoomType:[{text:'金币创房',value:'金币创房'}],
                operationForm:{},
                roomType:[{text:'普通创房',value:'普通创房'},{text:'俱乐部创房',value:'俱乐部创房'}],
                clubRoomType:[{text:'金币创房',value:'金币创房'}],
                AddCaseForm: {
                    c_project: '超越项目组',
                    c_version: '主版本',
                    c_play: '衡阳百胡',
                    c_date: '',
                    c_name: '',
                    c_mid:"",
                    c_purpose: '',
                    c_options: {
                        o_player: 3,
                        o_huxi:200,
                        roomTypeVuale:"普通创房",
                        clubRoomTypeVuale:'',
                        o_club_id:'',
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

            RemoveData(){
                this.$refs['AddCaseForm'].resetFields()
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
            Cancel(){
                this.$refs['AddCaseForm'].resetFields();
                this.add_visible = false;
            },
            getOption(val){
                for(var i in this.operation_list){
                    if (val === this.operation_list[i]){
                        return true
                    }
                }
            },

            getValue(val){
                if(val==2){
                    this.ShowFlag = true;
                }else{
                    this.ShowFlag= false;
                    this.threePeople= true;// 3人玩法标记
                }
            },
            addRow(tableData,event){
                tableData.push({users: '',operation:'',card:[]})
            },
            deleteRow(index, rows){
                ////删除改行
                rows.splice(index, 1);
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
            // 添加新的积分翻倍
            handleChange(){},

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
                        this.$message.error("做牌数据不能为空.");
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
                            c_steps: this.operationList,
                            c_account:this.AddCaseForm.c_mid,
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
