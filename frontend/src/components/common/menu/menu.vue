<template>
<div class="nav">
    <el-menu default-active="1"
    class="el-menu-vertical-demo"
    background-color="Transparent"
    text-color="#24292E"
    active-text-color="#409EFF"
    @open="handleOpen"
    @close="handleClose">
        <el-submenu index="1-1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>牵手跑胡子</span>
            </template>
                <el-submenu index="1-1-1">
                <template slot="title">跑胡子</template>
                    <el-menu-item index="1-1-1-1" ><router-link to="/cases/cy/shaoyangzipai" class="">邵阳字牌</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-2"><router-link to="/cases/cy/shaoyangbopi">邵阳剥皮</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-3"><router-link to="/cases/cy/leiyangzipai">耒阳字牌</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-4"><router-link to="/cases/cy/ldfangpaofa">娄底放炮罚</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-5"><router-link to="/cases/cy/xiangxiangpaohuzi">湘乡告胡子</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-6"><router-link to="/cases/cy/hengyangbaihu">衡阳百胡</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-7"><router-link to="/cases/cy/czzp">郴州字牌</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-8"><router-link to="/cases/cy/hylhq">衡阳六胡抢</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-9"><router-link to="/cases/cy/syfpf">邵阳放炮罚</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-10"><router-link to="/cases/cy/hyshk">衡阳十胡卡</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-11"><router-link to="/cases/cy/yxphz">攸县碰胡子</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-12"><router-link to="/cases/cy/cdphz">常德碰胡子</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-13"><router-link to="/cases/cy/hhhgw">怀化红拐弯</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-14"><router-link to="/cases/cy/yfphz">永丰跑胡子</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-14"><router-link to="/cases/cy/qdphz">祁东十五胡</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-15"><router-link to="/cases/cy/yywhz">益阳歪胡子</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-16"><router-link to="/cases/cy/csphz">长沙跑胡子</router-link></el-menu-item>
                    <el-menu-item index="1-1-1-17"><router-link to="/cases/cy/slbhgw">四六八红拐弯</router-link></el-menu-item>
            </el-submenu>

                <el-submenu index="1-1-2">
                    <template slot="title">麻将</template>
                    <el-menu-item index="1-1-2-1">红中麻将</el-menu-item>
                    <el-menu-item index="1-1-2-2">长沙麻将</el-menu-item>
                    <el-menu-item index="1-1-2-3">转转麻将</el-menu-item>
                    <el-menu-item index="1-1-2-4">衡阳麻将</el-menu-item>
                </el-submenu>

                <el-submenu index="1-1-3">
                    <template slot="title">扑克</template>
                    <el-menu-item index="1-1-3-1">打筒子</el-menu-item>
                    <el-menu-item index="1-1-3-2">跑得快15张</el-menu-item>
                    <el-menu-item index="1-1-3-3">跑得快16张</el-menu-item>
                </el-submenu>

            </el-submenu>
        <el-submenu index="2-1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>测试知识库</span>
            </template>
            <el-submenu index="6-1-1" >
                <template slot="title" style="color: #409EFF" ><router-link to="/konwledge/testpoint/list">测试点</router-link></template>
            </el-submenu>

            <el-submenu index="6-1-2">
                <template slot="title"><router-link to="/konwledge/skill/list">知识项</router-link></template>

            </el-submenu>
        </el-submenu>

        <el-submenu index="3-1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>牌库</span>
          </template>
          <el-submenu index="3-1-1" >
            <template slot="title" style="color: #409EFF" ><router-link to="/cardentrepot/list">牌库-配牌</router-link></template>
          </el-submenu>

            <el-submenu index="3-1-2" >
                <template slot="title" style="color: #409EFF" ><router-link to="/cardentrepot/deploy/ip">配置IP</router-link></template>
            </el-submenu>
        </el-submenu>

<!--            <el-submenu index="1-2">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>岳阳版本</span>-->
<!--                </template>-->
<!--                <el-submenu index="1-2-1">-->
<!--                    <template slot="title">字牌</template>-->
<!--                    <el-menu-item index="1-2-1-1">汨罗红字</el-menu-item>-->
<!--                    <el-menu-item index="1-2-1-2">岳阳歪胡子</el-menu-item>-->
<!--                    <el-menu-item index="1-2-1-3">福禄寿十九张</el-menu-item>-->
<!--                    <el-menu-item index="1-2-1-4">福禄寿二十张</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="1-2-2">-->
<!--                    <template slot="title">麻将</template>-->
<!--                    <el-menu-item index="1-2-2-1">逞癞子</el-menu-item>-->
<!--                    <el-menu-item index="1-2-2-2">长沙麻将</el-menu-item>-->
<!--                    <el-menu-item index="1-2-2-3">一脚癞油</el-menu-item>-->
<!--                    <el-menu-item index="1-2-2-4">转转麻将</el-menu-item>-->
<!--                    <el-menu-item index="1-2-2-5">红中麻将</el-menu-item>-->
<!--                    <el-menu-item index="1-2-2-6">二人长沙</el-menu-item>-->
<!--                    <el-menu-item index="1-2-2-7">湘阴推倒胡</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="1-2-3">-->
<!--                    <template slot="title">跑得快</template>-->
<!--                    <el-menu-item index="1-2-3-1">十五张玩法</el-menu-item>-->
<!--                    <el-menu-item index="1-2-3-2">十六张玩法</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->



<!--        <el-submenu index="2">-->
<!--            <template slot="title">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span>巨浪项目组</span>-->
<!--            </template>-->

<!--            <el-submenu index="2-1">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>湖南麻将版本</span>-->
<!--                </template>-->

<!--                <el-submenu index="2-1-1">-->
<!--                    <template slot="title">麻将</template>-->
<!--                    <el-menu-item index="2-1-1-1">红中麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-2">转转麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-3">长沙麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-4">邵阳麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-5">新宁麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-6">洞口麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-7">郴州麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-8">宁乡麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-9">益阳麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-10">监利麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-11">衡阳麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-12">怀化麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-1-1-13">湘阴推倒胡</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2-1-2">-->
<!--                    <template slot="title">跑胡子</template>-->
<!--                    <el-menu-item index="2-1-2-1">邵阳剥皮</el-menu-item>-->
<!--                    <el-menu-item index="2-1-2-2">常德跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-1-2-3">宁乡跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-1-2-4">怀化红拐弯</el-menu-item>-->
<!--                    <el-menu-item index="2-1-2-5">衡阳十胡卡</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2-1-3">-->
<!--                    <template slot="title">跑得快</template>-->
<!--                    <el-menu-item index="2-1-3-1">十五张玩法</el-menu-item>-->
<!--                    <el-menu-item index="2-1-3-2">十六张玩法</el-menu-item>-->
<!--                </el-submenu>-->

<!--            </el-submenu>-->

<!--            <el-submenu index="2-2">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>长沙棋牌版本</span>-->
<!--                </template>-->

<!--                <el-submenu index="2-2-1">-->
<!--                    <template slot="title">麻将</template>-->
<!--                    <el-menu-item index="2-2-1-1">红中麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-2-1-2">转转麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-2-1-3">长沙麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-2-1-4">宁乡麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-2-1-5">新二人转转</el-menu-item>-->
<!--                    <el-menu-item index="2-2-1-6">宁乡开王麻将</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2-2-2">-->
<!--                    <template slot="title">跑胡子</template>-->
<!--                    <el-menu-item index="2-2-2-1">攸县碰胡</el-menu-item>-->
<!--                    <el-menu-item index="2-2-2-2">宁乡跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-2-2-3">湘潭跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-2-2-4">望城跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-2-2-5">衡阳六胡抢</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2-2-3">-->
<!--                    <template slot="title">跑得快</template>-->
<!--                    <el-menu-item index="2-2-3-1">十五张玩法</el-menu-item>-->
<!--                    <el-menu-item index="2-2-3-2">十六张玩法</el-menu-item>-->
<!--                </el-submenu>-->


<!--            </el-submenu>-->

<!--            <el-submenu index="2-3">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>常德棋牌版本</span>-->
<!--                </template>-->

<!--                <el-submenu index="2-3-1">-->
<!--                    <template slot="title">麻将</template>-->
<!--                    <el-menu-item index="2-3-1-1">红中麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-3-1-2">转转麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-3-1-3">长沙麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-3-1-4">常德王麻将</el-menu-item>-->
<!--                    <el-menu-item index="2-3-1-5">逞癞子麻将</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2-3-2">-->
<!--                    <template slot="title">跑胡子</template>-->
<!--                    <el-menu-item index="2-3-2-1">常德跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-3-2-2">汉寿跑胡子</el-menu-item>-->
<!--                    <el-menu-item index="2-3-2-3">安乡偎麻雀</el-menu-item>-->
<!--                    <el-menu-item index="2-3-2-4">石门跑胡子</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="2-3-3">-->
<!--                    <template slot="title">跑得快</template>-->
<!--                    <el-menu-item index="2-3-3-1">十五张玩法</el-menu-item>-->
<!--                    <el-menu-item index="2-3-3-2">十六张玩法</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->

<!--        </el-submenu>-->



<!--        <el-submenu index="3">-->
<!--            <template slot="title">-->
<!--            <i class="el-icon-menu"></i>-->
<!--            <span>壹项目组</span>-->
<!--            </template>-->

<!--            <el-submenu index="3-1">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>主版本</span>-->
<!--                </template>-->

<!--                <el-submenu index="3-1-1">-->
<!--                    <template slot="title">跑得快</template>-->
<!--                    <el-menu-item index="3-1-1-1">十五张玩法</el-menu-item>-->
<!--                    <el-menu-item index="3-1-1-2">十六张玩法</el-menu-item>-->
<!--                </el-submenu>-->

<!--            </el-submenu>-->

<!--            <el-submenu index="3-2">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>湖南棋牌(娄底版本)</span>-->
<!--                </template>-->
<!--                <el-submenu index="3-2-1">-->
<!--                    <template slot="title">牵手跑得快</template>-->
<!--                    <el-menu-item index="3-2-1-1">510K</el-menu-item>-->
<!--                    <el-menu-item index="3-2-1-2">十五张玩法</el-menu-item>-->
<!--                    <el-menu-item index="3-2-1-3">十六张玩法</el-menu-item>-->

<!--                </el-submenu>-->

<!--                <el-submenu index="3-2-2">-->
<!--                    <template slot="title">牵手麻将</template>-->
<!--                    <el-menu-item index="3-2-2-1">转转麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-2-2-2">红中麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-2-2-3">长沙麻将</el-menu-item>-->
<!--                </el-submenu>-->


<!--                <el-submenu index="3-2-3">-->
<!--                    <template slot="title">牵手跑胡子</template>-->
<!--                    <el-menu-item index="3-2-3-1">娄底放炮罚</el-menu-item>-->
<!--                    <el-menu-item index="3-2-3-2">湘乡告胡子</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->

<!--            <el-submenu index="3-3">-->
<!--                <template slot="title">-->
<!--                    <i class="el-icon-document"></i>-->
<!--                    <span>益阳版本</span>-->
<!--                </template>-->

<!--                <el-submenu index="3-3-1">-->
<!--                    <template slot="title">牵手跑得快</template>-->
<!--                    <el-menu-item index="3-3-1-1">摸溜子</el-menu-item>-->
<!--                    <el-menu-item index="3-3-1-2">15张玩法</el-menu-item>-->
<!--                    <el-menu-item index="3-3-1-3">16张玩法</el-menu-item>-->
<!--                    <el-menu-item index="3-3-1-4">沅江千分</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="3-3-2">-->
<!--                    <template slot="title">牵手麻将</template>-->
<!--                    <el-menu-item index="3-3-2-1">益阳麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-3-2-2">红中麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-3-2-3">转转麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-3-2-4">长沙麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-3-2-5">安化麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-3-2-6">南县麻将</el-menu-item>-->
<!--                    <el-menu-item index="3-3-2-7">沅江麻将</el-menu-item>-->
<!--                </el-submenu>-->

<!--                <el-submenu index="3-3-3">-->
<!--                    <template slot="title">牵手跑胡子</template>-->
<!--                    <el-menu-item index="3-3-3-1">益阳歪胡子</el-menu-item>-->
<!--                    <el-menu-item index="3-3-3-2">南县鬼胡子</el-menu-item>-->
<!--                    <el-menu-item index="3-3-3-3">沅江鬼胡子</el-menu-item>-->
<!--                    <el-menu-item index="3-3-3-4">南县歪胡子</el-menu-item>-->
<!--                    <el-menu-item index="3-3-3-5">沅江八软息</el-menu-item>-->
<!--                    <el-menu-item index="3-3-3-6">安化跑胡子</el-menu-item>-->
<!--                </el-submenu>-->
<!--            </el-submenu>-->

<!--        </el-submenu>-->


    </el-menu>
</div>
</template>

<style lang="less" scoped>
.nav{
    height: 100%;
}


.el-menu-vertical-demo{
    height: 100%;
}


.el-menu-item-group__title{
    font-size: 16px;
    font-family: 'Microsoft YaHei';
}

.el-menu-item{
    text-align: center;
}

.el-submenu__title{
    text-align: left;
    background-color: #409EFF;
    color: #409EFF;
}

a{
    text-decoration:none;
    color: #409EFF;
}

a:hover{
    color: #409EFF;
}

a:visited{
  color: #24292E;
}

a:-webkit-any-link {
    color:#24292E ;
}
.router-link-active {
    text-decoration: #409EFF;
    color: #409EFF;
}
</style>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
