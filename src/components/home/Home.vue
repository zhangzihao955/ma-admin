<template>
  <!-- <div class="home"> -->
      <el-container class="container">
        <!-- 首页头部 -->
         <el-header class="header">
           <!-- 头部 layout组件 -->
             <el-row>
                <el-col :span="4"><div class="grid-content bg-purple"><img class="imgs" src="../../assets/img/Logo3.jpg" alt="无法显示"></div></el-col>
                <el-col :span="18"><h2 class="middle">大庙优购后台管理</h2></el-col>
                <el-col :span="2"><div class="grid-content bg-purple"><a @click='handleSignout' class="loginout" href="#">退出</a></div></el-col>
              </el-row>
         </el-header>
         <el-container>
           <!-- 侧边栏 -->
            <el-aside class="aside" width="200px">
              <!-- 侧边导航栏组件 -->
                <el-menu :unique-opened='true' :router='true'>
                    <!-- <el-submenu :index="''+item.order" v-for="(item,index) in menus" :key="index">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>{{item.authName}}</span>
                          </template>      
                          <el-menu-item :index="item2.path" v-for="(item1,index1) in item.children" :key="index1"> <i class="el-icon-user"></i><span>{{item1.authName}}</span></el-menu-item>
                    </el-submenu>                   -->
                    <el-submenu index="1">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>用户管理</span>
                          </template>      
                          <el-menu-item index="/users"> <i class="el-icon-user"></i><span>用户列表</span></el-menu-item>
                    </el-submenu>
                <!-- 2 -->
                    <el-submenu index="2">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>权限管理</span>
                          </template>      
                          <el-menu-item index="/role"> <i class="el-icon-s-custom"></i><span>角色列表</span></el-menu-item>
                          <el-menu-item index="/rights"> <i class="el-icon-lock"></i><span>权限列表</span></el-menu-item>
                    </el-submenu>
                <!-- 3-->
                    <el-submenu index="3">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>商品管理</span>
                          </template>      
                          <el-menu-item index="/goodslist"> <i class="el-icon-menu"></i><span>商品列表</span></el-menu-item>
                          <el-menu-item index="/categories"> <i class="el-icon-menu"></i><span>分类参数</span></el-menu-item>
                          <el-menu-item index="1-1"> <i class="el-icon-menu"></i><span>商品分类</span></el-menu-item>
                    </el-submenu>
                <!-- 4 -->
                    <el-submenu index="4">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>订单管理</span>
                          </template>      
                          <el-menu-item index="1-1"> <i class="el-icon-tickets"></i><span>订单列表</span></el-menu-item>
                    </el-submenu>
                <!-- 5-->
                    <el-submenu index="5">
                          <template slot="title">
                              <i class="el-icon-location"></i>
                              <span>数据统计</span>
                          </template>      
                          <el-menu-item index="1-1"> <i class="el-icon-edit-outline"></i><span>数据报表</span></el-menu-item>
                    </el-submenu>
                </el-menu>                
            </el-aside>
            <!-- 首页的右侧内容区域 -->
            <el-main class="main">
                <router-view></router-view>
            </el-main>
          </el-container>
      </el-container>
  <!-- </div> -->
</template>

<script>
export default {
  data() {
    return {
      //接受侧边导航请求的数据
      menus:[{
        authName:'用户管理',
        id:125,
        order:2,
        children:[{authName:'用户列表',path:'users'}]
      }],
    }
  },

  components: {

  },
  beforeCreate() {
    //获取token
    //const token = localStorage.getItem('token');
    //if token 有，渲染   没有-》login
  //   if(!token){
  //     this.$router.push('/login')
  //   }
   },
   created() {
     this.getMenus()
   },
   methods: {
     //获取侧边栏导航数据
     async getMenus(){
      //  const res = await this.$http.get('menus');
      //  console.log(res);
      //  this.menus = res.data.data;
     },
     //退出按钮
     handleSignout(){
       //清楚token
      //  localStorage.clear();
       //，提示
       this.$message.success('退出成功');
       //，来到login
       this.$router.push('/login')
     }
   },
}
</script>
<style lang="less" scoped>
  .container{
    height:100%;

    .header{
    background-color: #b3c0d1;
    }
  }
  .aside{
    background-color:#d3dce6;
  }
  .main{
    background-color: #e9eef3;
  }
  // 头部样式调整
  .imgs{
    height: 60px;
    width: 100%;
  }
  .middle{
    text-align: center;
  }
  .loginout{
    // 取消下划线
    text-decoration:none;
    line-height: 60px;
  }
</style>