import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/common/home/index'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-default/index.css'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
        {
          path:"/",
          component:()=> import('@/views/bugs/bug')
        },
        {
          path: '/member',
          name: 'member',
          component: ()=> import('@/views/member/member'),
        },
        {
          path: '/bugs',
          name: 'Bugs',
          component:()=> import('@/views/bugs/bug')
        },
        {
          path: '/cases/cy/shaoyangzipai',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/syzp/shaoyangzipai')
        },
        //耒阳字牌
        {
          path: '/cases/cy/leiyangzipai',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/leiyangzp/leiyangzp')
        },

        // 娄底放炮罚
        {
          path: '/cases/cy/ldfangpaofa',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/LouDiFangPaoFa/loudifangpaofa')
        },

        // 湘乡告胡子
        {
          path: '/cases/cy/xiangxiangpaohuzi',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/xiangxiangpaohuzi/xiangxiangpaohuzi')
        },
        // 衡阳百胡
        {
          path: '/cases/cy/hengyangbaihu',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/hengyangbaihu/hengyangbaihu')
        },
        // 郴州字牌
        {
          path: '/cases/cy/czzp',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/chenzhouzp/czzp')
        },
        // 衡阳六胡抢
        {
          path: '/cases/cy/hylhq',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/hengyanglhq/hylhq')
        },
        // 邵阳放炮罚
        {
          path: '/cases/cy/syfpf',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/shaoyangfangpaofa/syfpf')
        },
        // 衡阳十胡卡
        {
          path: '/cases/cy/hyshk',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/hengyangshk/hyshk')
        },
        // 攸县碰胡子
        {
          path: '/cases/cy/yxphz',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/youxianphz/yxphz')
        },
        // 常德跑胡子
        {
          path: '/cases/cy/cdphz',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/changdephz/cdphz')
        },
        // 怀化红拐弯
        {
          path: '/cases/cy/hhhgw',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/huaihuahgw/hhhgw')
        },

        // 永丰跑胡子
        {
          path: '/cases/cy/yfphz',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/yongfengphz/yfphz')
        },
        // 祁东十五胡
        {
          path: '/cases/cy/qdphz',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/qidongphz/qdphz')
        },
        // 益阳歪胡子
        {
          path: '/cases/cy/yywhz',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/yiyangwhz/yywhz')
        },
        // 长沙跑胡子
        {
          path: '/cases/cy/csphz',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/changshaphz/csphz')
        },
        // 四六八红拐弯
        {
          path: '/cases/cy/slbhgw',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/siliubahgw/slbhgw')
        },
        // 邵阳剥皮
        {
          path: '/cases/cy/shaoyangbopi',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/QS_paohuzi/sybp/shaoyangbopi')
        },
        // 红中麻将
        {
          path: '/cases/cy/hongzhongmajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/hzmj/hongzhongMJ')
        },
        // 长沙麻将
        {
          path: '/cases/cy/changshamajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/csmj/changshaMJ')
        },
        // 转转麻将
        {
          path: '/cases/cy/zhuanzhuanmajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/zzmj/ZhuanZhuanMJ')
        },
        // 衡阳麻将
        {
          path: '/cases/cy/hengyangmajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/hymj/HYMJ')
        },
        // 新宁麻将
        {
          path: '/cases/cy/xinningmajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/xnmj/XinNingMJ')
        },
        // 邵阳麻将
        {
          path: '/cases/cy/shaoyangmajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/symj/ShaoYangMJ')
        },
        // 靖州麻将
        {
          path: '/cases/cy/JingZhoumajiang',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/majiang/jzmj/JingZhouMJ')
        },
        // 跑得快15张
        {
          path: '/cases/cy/runfastfifteen',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/runfast/r_fifteen/fifteen_list')
        },
        // 跑得快16张
        {
          path: '/cases/cy/runfastsixteen',
          name: 'Cases',
          component: ()=> import('@/views/cases/chaoyueteam/runfast/r_sixteen/sixteen_list')
        },

        // 知识项
        {
          path: '/testcase/skill/list',
          name: 'skill',
          component: () => import('@/views/testcase/skill/skill_list')
        },

        {
          path: '/testcase/testpoint/list',
          name: 'TestPoint',
          component: () => import('@/views/testcase/testpoint/testpoint_list')
        },
        //添加用例
        {
          path: '/testcase/addcase/list',
          name: 'addcase',
          component: () => import('@/views/testcase/addcase/case_list')
        },
        // 测试牌库
        {
          path: '/cardentrepot/list',
          name: 'cardentrepot',
          component: () => import('@/views/cardEntrepot/list_card')
        },
        // 配置IP
        {
          path: '/cardentrepot/deploy/ip',
          name: 'deploy',
          component: () => import('@/views/cardEntrepot/deployIP/list_deployip')
        },

        // tool---添加俱乐部人数
        {
          path: '/tool/addclubpeople/list',
          name: 'addclubpeople',
          component: () => import('@/views/tool/addClubPeople/club_list')
        },
        // 跑脚本服务器列表
        {
          path: '/configuration/im_cfg_base/list',
          name: 'configuration',
          component: () => import('@/views//configuration/im_cfg_base/list_cfg')
        },
        // 版本信息
        {
          path: '/operateSystem/version/list',
          name: 'configuration',
          component: () => import('@/views/operateSystem/versions/version_list')
        },


      ]
    },
    {
      path:'*',
      name:"404",
      component: ()=> import('@/views/member/member'),
    }
  ]
})
