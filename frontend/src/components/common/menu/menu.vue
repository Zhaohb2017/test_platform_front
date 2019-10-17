<template>
<div class="nav">
    <el-menu default-active="1"
    class="el-menu-vertical-demo"
    background-color="Transparent"
    text-color="#24292E"
             :unique-opened="true"
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
                        <router-link to="/cases/cy/shaoyangzipai" class=""> <el-menu-item index="1-1-1-1" >邵阳字牌</el-menu-item></router-link>
                        <router-link to="/cases/cy/shaoyangbopi" class=""> <el-menu-item index="1-1-1-2" >邵阳剥皮</el-menu-item></router-link>
                        <router-link to="/cases/cy/leiyangzipai" class=""> <el-menu-item index="1-1-1-3" >耒阳字牌</el-menu-item></router-link>
                        <router-link to="/cases/cy/ldfangpaofa" class=""> <el-menu-item index="1-1-1-4" >娄底放炮罚</el-menu-item></router-link>
                        <router-link to="/cases/cy/xiangxiangpaohuzi" class=""> <el-menu-item index="1-1-1-5" >湘乡告胡子</el-menu-item></router-link>
                        <router-link to="/cases/cy/hengyangbaihu" class=""> <el-menu-item index="1-1-1-6" >衡阳百胡</el-menu-item></router-link>
                        <router-link to="/cases/cy/czzp" class=""> <el-menu-item index="1-1-1-7" >郴州字牌</el-menu-item></router-link>
                        <router-link to="/cases/cy/hylhq" class=""> <el-menu-item index="1-1-1-8" >衡阳六胡抢</el-menu-item></router-link>
                        <router-link to="/cases/cy/syfpf" class=""> <el-menu-item index="1-1-1-9" >邵阳放炮罚</el-menu-item></router-link>
                        <router-link to="/cases/cy/hyshk" class=""> <el-menu-item index="1-1-1-10" >衡阳十胡卡</el-menu-item></router-link>
                        <router-link to="/cases/cy/yxphz" class=""> <el-menu-item index="1-1-1-11" >攸县碰胡子</el-menu-item></router-link>
                        <router-link to="/cases/cy/cdphz" class=""> <el-menu-item index="1-1-1-12" >常德跑胡子</el-menu-item></router-link>
                        <router-link to="/cases/cy/hhhgw" class=""> <el-menu-item index="1-1-1-13" >怀化红拐弯</el-menu-item></router-link>
                        <router-link to="/cases/cy/yfphz" class=""> <el-menu-item index="1-1-1-14" >永丰跑胡子</el-menu-item></router-link>
                        <router-link to="/cases/cy/qdphz" class=""> <el-menu-item index="1-1-1-15" >祁东十五胡</el-menu-item></router-link>
                        <router-link to="/cases/cy/yywhz" class=""> <el-menu-item index="1-1-1-16" >益阳歪胡子</el-menu-item></router-link>
                        <router-link to="/cases/cy/csphz" class=""> <el-menu-item index="1-1-1-17" >长沙跑胡子</el-menu-item></router-link>
                        <router-link to="/cases/cy/slbhgw" class=""> <el-menu-item index="1-1-1-18" >四六八红拐弯</el-menu-item></router-link>
                    </el-submenu>
                <el-submenu index="1-1-2">
                        <template slot="title">麻将</template>
                        <router-link to="/cases/cy/hongzhongmajiang" class=""> <el-menu-item index="1-1-2-1" >红中麻将</el-menu-item></router-link>
                        <router-link to="/cases/cy/changshamajiang" class=""> <el-menu-item index="1-1-2-2" >长沙麻将</el-menu-item></router-link>
                        <router-link to="/cases/cy/zhuanzhuanmajiang" class=""> <el-menu-item index="1-1-2-3" >转转麻将</el-menu-item></router-link>
                        <router-link to="/cases/cy/hengyangmajiang" class=""> <el-menu-item index="1-1-2-4" >衡阳麻将</el-menu-item></router-link>
                        <router-link to="/cases/cy/xinningmajiang" class=""> <el-menu-item index="1-1-2-5" >新宁麻将</el-menu-item></router-link>
                        <router-link to="/cases/cy/shaoyangmajiang" class=""> <el-menu-item index="1-1-2-6" >邵阳麻将</el-menu-item></router-link>
                        <router-link to="/cases/cy/JingZhoumajiang" class=""> <el-menu-item index="1-1-2-7" >靖州麻将</el-menu-item></router-link>
                </el-submenu>

                <el-submenu index="1-1-3">
                    <template slot="title">扑克</template>
                    <router-link to="/cases/cy/runfastfifteen" class=""> <el-menu-item index="1-1-3-1" >跑得快15张</el-menu-item></router-link>
                    <router-link to="/cases/cy/runfastsixteen" class=""> <el-menu-item index="1-1-3-2" >跑得快16张</el-menu-item></router-link>
                </el-submenu>
            </el-submenu>

        <el-submenu index="2-1">
            <template slot="title">
                <i class="el-icon-menu"></i>
                <span>测试用例库</span>
            </template>
            <router-link to="/testcase/skill/list" class=""> <el-menu-item index="2-1-2-" >知识项</el-menu-item></router-link>
            <router-link to="/testcase/testpoint/list" class=""> <el-menu-item index="2-1-1-" >测试点</el-menu-item></router-link>
            <router-link to="/testcase/addcase/list" class=""> <el-menu-item index="2-1-3-" >用例库</el-menu-item></router-link>
            <router-link to="/bugs" class=""> <el-menu-item index="2-1-2-" >Bug库</el-menu-item></router-link>
            <router-link to="/testcase/testReport/list" class=""> <el-menu-item index="2-1-4" >测试报告</el-menu-item></router-link>
        </el-submenu>


        <el-submenu index="3-1">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>工具库</span>
            </template>
            <router-link to="/cardentrepot/list" class="" style="float: left;"> <el-menu-item index="3-1-4-" >牌库配牌</el-menu-item></router-link>
            <router-link to="/cardentrepot/deploy/ip" class="" style="float: left;"> <el-menu-item index="3-1-5-" >配置服务器IP</el-menu-item></router-link>
            <router-link to="/operateSystem/version/list" class="" style="float: left;"> <el-menu-item index="3-1-2" >运营后台链接</el-menu-item></router-link>
            <router-link to="/configuration/im_cfg_base/list" style="float: left;" class=""> <el-menu-item index="3-1-1" >配置服务器数据</el-menu-item></router-link>
            <router-link to="/tool/weekly/list" style="float: left;"> <el-menu-item index="3-1-6" >周报</el-menu-item></router-link>
        </el-submenu>
        <el-submenu index="4-1">
            <template slot="title">
                <i class="el-icon-setting"></i>
                <span>操作日志</span>
            </template>
            <router-link to="/tool/loginfo/list"  style="float: left;"> <el-menu-item index="4-1-1" >配牌操作日志</el-menu-item></router-link>
        </el-submenu>
    </el-menu>
</div>
</template>

<style lang="less" scoped>
.nav{
    height: 100%;
    min-height: 880px;
    display: block;
    border-right: solid 1px #e6e6e6;
}


.el-menu-vertical-demo{
    height: 100%;
    min-height: 880px;
    display: block;
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

.el-menu-vertical-demo .el-menu:not(.el-menu--collapse) {
  width: 200px;
  height: auto;
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
