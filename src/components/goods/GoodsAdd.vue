<template>
    <el-card class="box_goodsadd">
        <!-- 面包屑 -->
        <my-bread level1="商品管理" level2="商品列表"></my-bread>
        <!-- 提示框 -->
           <el-alert class="alert"
            title="添加商品信息"
              type="success"
             center
            show-icon>
           </el-alert>
           <!-- 步骤条组件 -->
           <el-steps :active="1*active" finish-status="success">
               <el-step title="基本信息"></el-step>
               <el-step title="商品参数"></el-step>
               <el-step title="商品属性"></el-step>
               <el-step title="商品图片"></el-step>
               <el-step title="商品内容"></el-step>
           </el-steps>
           <!-- 商品的添加内容是表单形式，所以在最外层，加上from来获取tabs里边的数据 -->
           <el-form label-position="top" label-width="80px" :model="form" style="height:400px;overflow:auto">
           <!-- 商品内容 -->              
               <el-tabs v-model="active" tab-position="left" @tab-click='tabchange'>
                  <el-tab-pane name="1" label="基本信息">
                      <el-form-item label="商品名称">
                          <el-input v-model="form.goods_name"></el-input>
                      </el-form-item>
                      <el-form-item label="商品价格">
                          <el-input v-model="form.goods_price"></el-input>
                      </el-form-item>   
                      <el-form-item label="商品重量">
                          <el-input v-model="form.goods_weight"></el-input>
                      </el-form-item>   
                      <el-form-item label="商品数量">
                          <el-input v-model="form.goods_number"></el-input>
                      </el-form-item>
                      <el-form-item label="商品分类">    
                      <!-- //级联选择器 也是表单，也要包裹在 el-form-item中
                      expand-trigger: 'hover' 划过效果  
                      :options="options" 控制数据
                      v-model="value"   最终选定的值 是一个数组
                      @change="handleChange" 点击不同的label触发
                      :props='defauitProp' 是一个对象
                      -->
                        <el-cascader v-model="value"
                        :options="options"
                        :props="defauitProp" 
                        @change="handleChange">
                        </el-cascader>
                      </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="2" label="商品参数">
                        <el-form-item label="商品参数名xxx_item.arrt_name" v-for="(item,index) in arrdyparams" :key="index">
                            <!-- //多选框组件model='item.arrt_vals' -->
                             <el-checkbox-group v-model="arrdyparams">
                                 <el-checkbox border label="复选框 A"></el-checkbox>
                                 <el-checkbox label="复选框 B"></el-checkbox>
                                  <el-checkbox label="复选框 C"></el-checkbox>
                              </el-checkbox-group>
                        </el-form-item>   
                  </el-tab-pane>
                  <el-tab-pane name="3" label="商品属性">
                       <el-form-item label="商品属性xxx" v-for="(item,index) in arrstaticparams" :key="index">
                          <el-input :v-model="item"></el-input>
                      </el-form-item>                     
                  </el-tab-pane>
                  <el-tab-pane name="4" label="商品图片">
                      <!-- //上传图片组件 -->
                      <el-form-item>
                      <el-upload
                       class="upload-demo"
                         action="https://jsonplaceholder.typicode.com/posts/"
                        :on-preview="handlePreview"
                        :on-remove="handleRemove"
                        :on-success='handlesuccess'
                        :headers="headers"
                         list-type="picture">
                           <el-button size="small" type="primary">点击上传</el-button>
                           <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                      </el-upload>
                      </el-form-item>
                  </el-tab-pane>
                  <el-tab-pane name="5" label="商品内容">
                      <el-form-item>
                          <!-- //表单元素 -->
                      <el-button type="primary" @click="addgoods">点击添加商品</el-button>
                      <!-- 富文本编辑器 -->
                      <quill-editor v-model="form.goods_introduce"></quill-editor>
                      </el-form-item>
                  </el-tab-pane>
               </el-tabs>
           </el-form>
     </el-card>
</template>
<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
 
import { quillEditor } from 'vue-quill-editor'
export default {
      components: {
         quillEditor
            },   
    data() {
        return {
            //步骤条和tabs切换组绑定相同的 active 实现tabs和步骤条的切换
            active:0,
            //添加商品的表单数据,form的属性要和接口的参数一致的key
            //this.$http.post(url,this.form)
            //添加商品的请求接口的参数
            //goods_name 商品名称 不能为空
            //goods_cat 以‘,’ 分割的分类列表 不能为空 就是级联选择器的默认数组里的数字
            //goods_price 价格 不能 为空
            //goods_number 数量 不能为空
            //goods_weight 重量 不能为空
            //goods_introduce 介绍 可以为空
            //prics 上传的图片临时路径 （对象）/时一个数组，里边一个对象放临时路径
            //attrs 商品的参数（数组）/指商品的动态参数和静态参数的集合数组
            form:{
                goods_name:'',
                goods_cat:'',
                goods_price:'',
                goods_number:'',
                goods_weight:'',
                goods_introduce:'', 
                prcs:[{prc:''}],
                attrs:[]
            },
            //级联选择器要绑定的数据
             options:[{cat_deleted:false,caat_id:1,cat_level:0,cat_name:'大家电',cat_pid:0,children:[]}],
              value:[1,3,6],
            defauitProp:{
                label:'cat_name',
                value:'cat_id',
                children:'children'
            },
            //商品参数动态数组数据
            arrdyparams:[1,2],
            //静态参数的数据数组
            arrstaticparams:[3,4],
            //文件上传请求头部设置
            headers:{
                Authorization:localStorage.getItem('token')
            }
        }
    },
    created() {
        // getGoodCate()
    },
    methods: {
        //点击添加商品按钮 发请求
        async addgoods(){
            //goods_cat->分类
            //this.form.goods_cat = this.value.join(',');
            //prcs：[{prc:'图片临时路径'}] 在图片的上传和移除操作里 进行prc的赋值操作
            // --在图片上传成功方法里 保存图片路径
            //attrs:[{attr_id:?,attr_value:?}] 
            //动态参数数组this.arrdyparams,遍历-取值-放在新的数组中 ,取到数组里的数据，放入新数组中
            //let arr1 = this.arrdyparams.map(item=>{
              //  return {attr_id:item.arrt_id,attr_value:item.attr_vals}
            //})
            //静态参数数组this.arrstaticparams,遍历-取值-放在新的数组中 ,取到数组里的数据，放入新数组中
            //let arr2 = this.arrdyparams.map(item=>{
              //  return {attr_id:item.arrt_id,attr_value:item.attr_vals}
            //})    
            //合并动态arr1和静态arr2数组
            //this.form.attrs = [...arr1,...arr2];        
            //在发送请求之前，处理this.form中的未处理数据
           // const res = await this.$http.post('goods',this.form);
            //console.log(res)
            // 添加成功，回到商品列表页
            this.$router.push('/goodslist')
        },
        //图片上传时的相关方法
        //file形参里面时当前操作的图片的相关信息（图片名/路径）
        handlesuccess(file){},
        //文件删除触发的事件
        handleRemove(file){
            //从this.form.pics移除当前X掉的图片路径
            //file.respinse.data.tmp_path 图片临时上传的路径
            //先获取该图片的索引，
            //findIndex()遍历 把符合条件的元素的索引进行返回
            // let indexx = this.form.pics.findIndex(item=>{
            //     item.pic===file.respinse.data.tmp_path
            // })    
            // 删除该图片路径 
            // this.form..pics.splice(索引，1)      
        },
        //文件上传成功触发的事件
        handlePreview(file){
            //把图片的临时路径保存在form的prcs属性里
            //file.data.tmp_path 图片临时上传的路径
            this.form.pics.push({
                pic:file.data.tmp_path
            })
        },
        //点击不同的tab时 触发的方法
        async tabchange(){
            // //点击的是第二个tab，并且 三级分类要有值，才发送请求
            // if(this.active==='2'){
            //     if(this.value.length!==3){
            //         //提示
            //         this.$message.warning('请先选择商品的三级分类')
            //         return
            //     }
            //     //获取数据
            //     const res = await this.$http.get('categories/${this.value[2]}/attributes?sel=many');
            //     //attr_name 和 attr_vals
            //     this.arrdyparams = res.data.data
            //     this.arrdyparams.forEach(item2=>{
                //并不是所有的三级分类都是有值的
            //    item.attr_vals = item.attr_vals.length===0?[]:item.attr_vals.trim().split(',')
            //    item2.attr_vals = item.attr_vals.trim().split(',')
            //})else if(this.active===3 说明点击了第三个tab切换栏){
            //  if(this.value.length!==3){
            //         //提示
            //         this.$message.warning('请先选择商品的三级分类')
            //         return
            //     }
             // 发起商品属性的接口请求  
             //const res = await this.$http.get('categories/${this.selectedoptions[2]}/attributes?sel=only')
             //this.arrstaticparams=res.data.data
            //}
            // }
        },
        // 级联选择器change事件触发的方法
        handleChange(){

        },
        //后台获取三级分类的信息
        async getGoodCate(){
            // const res = await this.$http.get('categories?type=3');
            // this.options = res.data.data
        }
    },
}
</script>
<style lang="less" scoped>
    .box_goodsadd{
        height: 100%;
    }
    .alert{
        margin-top: 10px;
    }

   .ql-container {
    min-height: 200px;
    }
</style>