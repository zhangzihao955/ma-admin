<template>
    <el-card>
        <!-- //面包屑 -->
        <my-bread level1="商品管理" level2="分类参数"></my-bread>
        <!-- 提示框 el-alret提示警告-->
           <el-alert class="alert"
            title="只允许为第三级分类设置参数"
              type="error"
             center
            show-icon>
           </el-alert>      
           <!-- 级联选择器   -->
           <el-form label-position='left' label-width='80px'>
               <el-form-item label='商品分类'>
                    <el-cascader v-model="value"
                    :show-all-levels="false"
                    :options="options"
                    :props="defauitProp" 
                    @change="handleChange">
                    </el-cascader>     
               </el-form-item>
           </el-form>
           <!-- tab切换，静态和动态参数 -->
          <el-tabs v-model="active" @tab-click="handleClick">
               <el-tab-pane label="动态参数" name="1">
                     <el-button type="danger">设置动态参数</el-button>
                     <!-- 表格 -->
                      <el-table
                    :data="tableData"
                     style="width: 100%">
                     <el-table-column type="#">
                    <template slot-scope="props">
                   
                    </template>
                    </el-table-column>
    <el-table-column
      label="商品 ID"
      prop="id">
    </el-table-column>
    <el-table-column
      label="商品名称"
      prop="name">
    </el-table-column>
    <el-table-column
      label="描述"
      prop="desc">
    </el-table-column>
  </el-table>
                     <!-- 表格结束 -->
               </el-tab-pane>
               <el-tab-pane label="静态参数" name="2">
                    <el-button type="danger">设置静态参数</el-button>
                    
               </el-tab-pane>
          </el-tabs>
    </el-card>
</template>
<script>
export default {
    data() {
        return {
             options:[{cat_deleted:false,caat_id:1,cat_level:0,cat_name:'大家电',cat_pid:0,children:[]}],
            value:[1,3,6],
             defauitProp:{
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            arrdyparams:[],
            //tab切换
            active:'1'
        }
    },
    created() {
        this.getGoodCate()
    },
    methods: {
        //tab切换栏事件
        handleClick(){

        },
        //级联选择器label改变的方法
        handleChange(){
            // if(this.value.length===3){
            //     //获取动态参数
            //     const res = await this.$http.get(
            //         'categoriex/${this.value[2]}/attributes?sel=many'
            //     )
            //     this.arrdyparams = res.data.data
            // }
        },
        //获取三级分类数据
               //后台获取三级分类的信息
        async getGoodCate(){
            // const res = await this.$http.get('categories?type=3');
            // this.options = res.data.data
             //  const res = await this.$http.get('categories/${this.value[2]}/attributes?sel=many');
            //     //attr_name 和 attr_vals
            //     this.options = res.data.data
        }
    },
}
</script>
<style lang="less" scoped>
    .alert{
        margin-top: 10px;
    }
</style>