<template>
  <div v-if="add_visible" class="lg">
    <el-dialog
      title="添加测试用例"
      width="40%"
      center
      :show-close="false"
      :modal-append-to-body="false"
      @closed="Closeed"
      :visible="true">

      <el-form ref="AddCaseForm" :model="AddCaseForm" :rules='addrules' label-width="80px">

        <el-form-item label="日 期" prop="c_date">
          <el-date-picker type="date" style="width: 100%;" placeholder="选择日期"
                          v-model="AddCaseForm.c_date"></el-date-picker>
        </el-form-item>

        <el-form-item label="提 交 人" prop="c_name">
          <el-input type="text" placeholder="请输入提交人信息" v-model="AddCaseForm.c_name"></el-input>
        </el-form-item>

        <el-form-item label="测试目的" prop="c_purpose">
          <el-input type="text" placeholder="请输入测试目的" v-model="AddCaseForm.c_purpose"></el-input>
        </el-form-item>

        <el-form-item label="创房选项" width="290" min-width="180" header-align="center" prop="c_options">
          <el-card class="box-card">
            <div>
              <template>
                <span>玩法1：</span>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa1" label='翻宝'>翻宝</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa1" label='夹子'>夹子</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa1" label='索胡'>索胡</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>局数：</span>
                <el-radio v-model="AddCaseForm.c_options.o_round" :label=8>8局</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_round" :label=12>12局</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_round" :label=16>16局</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>人数：</span>
                <el-radio-group v-model="AddCaseForm.c_options.o_player">
                  <el-radio :label=2>2人</el-radio>
                  <el-radio :label=3>3人</el-radio>
                  <el-radio :label=4>4人</el-radio>
                </el-radio-group>
              </template>
            </div>
            <div>
              <template>
                <span>玩法2：</span>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa2" label='带宝胡'>带宝胡</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa2" label='见宝飞'>见宝飞</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa2" label='宝飞尽'>宝飞尽</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>封顶：</span>
                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='两宝封顶'>两宝封顶</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='三宝封顶'>三宝封顶</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_fengding" label='不封顶'>不封顶</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>荒庄：</span>
                <el-radio v-model="AddCaseForm.c_options.o_huangzhuang" label='0张荒庄'>0张荒庄</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_huangzhuang" label='20张荒庄'>20张荒庄</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>首局坐庄：</span>
                <el-radio v-model="AddCaseForm.c_options.o_shoujuzuozhuang" label='房主坐庄'>房主坐庄</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_shoujuzuozhuang" label='随机坐庄'>随机坐庄</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>宝分：</span>
                <el-radio v-model="AddCaseForm.c_options.o_baofen" label='飞一宝5分'>飞一宝5分</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_baofen" label='飞一宝15分'>飞一宝15分</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>玩法3：</span>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa3" label='吃牌不能跟'>吃牌不能跟</el-radio>
                <el-radio v-model="AddCaseForm.c_options.o_wanfa3" label='吃牌可以跟'>吃牌可以跟</el-radio>
              </template>
            </div>
            <div>
              <template>
                <span>防作弊：</span>
                <!-- `checked` 为 true 或 false -->
                <el-checkbox v-model="AddCaseForm.c_options.o_fangzuobi" :checked=false >防作弊</el-checkbox>
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
  .lg {
    text-align: center;
  }

  .el-input {
    float: left;
  }

  .el-cascader {
    width: 100%;
  }

  // 底部按钮居中
  .el-dialog__footer {
    text-align: center;
  }

  // 按钮样式
  .el-button {
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
    props: ['visible'],
    data() {
      return {
        // 配置AddCaseForm的填写规则
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
        },
        //设置AddCaseForm的初始化默认值
        AddCaseForm: {
          c_project: '开心游戏项目组',
          c_version: '开心游戏版本',
          c_play: '余干麻将',
          c_date: '',
          c_name: '',
          c_purpose: '',
          c_options: {
            o_wanfa1: '翻宝',
            o_round: 8,
            o_player: 4,
            o_wanfa2: '带宝胡',
            o_fengding: '不封顶',
            o_huangzhuang: '0张荒庄',
            o_shoujuzuozhuang: '房主坐庄',
            o_baofen: '飞一宝15分',
            o_wanfa3: '吃牌可以跟',
            o_fangzuobi: false,
          },
          c_steps: '',
          c_cards: '',
          c_remake: '',
        },
        add_visible: this.visible,
        re_data: '',
      };
    },

    // 监听弹窗可视
    watch: {
      visible(val) {
        this.add_visible = val
      },
      add_visible(val) {
        this.$emit('update:visible', val)
      }
    },

    methods: {
      Closeed() {
        this.add_visible = false;
      },

      handleClose(done) {
        this.Closeed();
      },

      RemoveData() {
        this.$refs['AddCaseForm'].resetFields()
      },

      Cancel() {
        this.$refs['AddCaseForm'].resetFields()
        this.add_visible = false;
      },

      AddCase() {
        if (this.$store.state.user != null) {
          if (this.AddCaseForm.c_date == '') {
            this.$message.error("日期不能为空.")
            return
          }

          if (this.AddCaseForm.c_name == '') {
            this.$message.error("提交人不能为空.")
            return
          }


          if (this.AddCaseForm.c_purpose == '') {
            this.$message.error("测试目的不能为空.")
            return
          }

          if (this.AddCaseForm.c_cards == '') {
            this.$message.error("做牌数据不能为空.")
            return
          }

          if (this.AddCaseForm.c_steps == '') {
            this.$message.error("操作步骤不能为空.")
            return
          }
          let that = this;
          var options = {
            '玩法1': this.AddCaseForm.c_options.o_wanfa1,
            '局数': this.AddCaseForm.c_options.o_round,
            '人数': this.AddCaseForm.c_options.o_player,
            '玩法2': this.AddCaseForm.c_options.o_wanfa2,
            '封顶': this.AddCaseForm.c_options.o_fengding,
            '荒庄': this.AddCaseForm.c_options.o_huangzhuang,
            '首局坐庄': this.AddCaseForm.c_options.o_shoujuzuozhuang,
            '宝分': this.AddCaseForm.c_options.o_baofen,
            '玩法3': this.AddCaseForm.c_options.o_wanfa3,
            '防作弊': this.AddCaseForm.c_options.o_fangzuobi,
          }
          console.log(options)
          axios({
            method: 'post',
            url: '/api/cases/c_add',
            data: {
              c_cards: this.AddCaseForm.c_cards,
              c_date: this.AddCaseForm.c_date,
              c_name: this.AddCaseForm.c_name,
              c_purpose: this.AddCaseForm.c_purpose,
              c_remake: this.AddCaseForm.c_remake,
              c_steps: this.AddCaseForm.c_steps,
              c_project: this.AddCaseForm.c_project + '-' + this.AddCaseForm.c_version,
              c_play: this.AddCaseForm.c_play,
              c_options: options,
            }
          }).then(function (resp) {
            that.$refs['AddCaseForm'].resetFields()
            that.re_data = resp.data
            setTimeout(() => {
              that.$emit("reload")
            }, 800);
          }).catch(resp => {
            that.re_data = resp.data
          });
        } else {
          this.$message.error("请先登录")
        }

      },
    },
  }
</script>
