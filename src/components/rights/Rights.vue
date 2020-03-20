<template>
    <el-card class="box_rights">
        <!-- 面包屑 -->
        <!-- <el-breadcrumb separator="/">
           <el-breadcrumb-item>首页</el-breadcrumb-item>
           <el-breadcrumb-item>权限管理</el-breadcrumb-item>
           <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb> -->
        <!-- 面包屑 -->        
        <my-bread level1="权限管理" level2="角色列表"></my-bread>   
        <!-- 权限列表表格      -->
        <el-table
         :data="rightsList"
         border
         style="width: 100%">
         <!-- 序号tape='index' -->
          <el-table-column
          type='index' 
            label="#"
            width="40">
          </el-table-column>
          <el-table-column
          prop="authName"
          label="权限名称"
          width="180">
          </el-table-column>
          <el-table-column
           prop="path"
         label="路径">
         </el-table-column>
          <el-table-column label="层级">
              <template slot-scope="rightsList">
                  <!-- rightsList.row.level 0/1/2 -->
                    <span v-if="rightsList.row.level==='0'">一级</span>
                    <span v-if="rightsList.row.level==='1'">二级</span>
                    <span v-if="rightsList.row.level==='2'">三级</span>
              </template>
         </el-table-column>         
         </el-table>

        <!-- 权限列表表格结束 -->
    </el-card>
</template>
<script>
export default {
    data(){
        return {
            rightsList:[
                {
                    authName:'商品管理',
                    level:'0',
                    path:'goods',
                    id:222,
                    rid:34
                }
            ]
        }
    },
    created() {
        // this.getRightsList()
    },
    methods: {
        //获取权限列表数据
        // async getRightsList(){
        //         const res = await this.$http.get('/rights/list')
        //         console.log(res)
        //         this.rightsList = res.data.data
        // }
    },
}
</script>
<style lang="less" scoped>

</style>