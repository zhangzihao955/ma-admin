<template>
  <el-card>
<!-- 面包屑 -->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>  
    <!-- 按钮 -->
    <el-row class="addrolebtn">
         <el-button type="primary">主要按钮</el-button>
    </el-row>
    <!-- 角色列表的展示 -->
     <el-table :data="rolesList" style="width: 100%">
              <el-table-column type='expand' width="60">
                  <template slot-scope="rolesList">
                      <!-- 一行里边分左右两列，右侧里边又分为左右两列 -->
                      <el-row v-for="(item,index) in rolesList" :key="index">
                          <!-- 左侧 -->
                          <el-col :span='4'>
                              <el-tag @close='deleRight(rolesList.row.id,item1.id)' closable >{{item.rolName}}</el-tag>
                              <i class="el-icon-arrow-right"></i>
                          </el-col>
                          <!-- 右侧 -->
                          <el-col :span="20">
                              <el-row v-for="(item1,index1) in item.children" :key="index1">
                                  <el-col :span='4'>
                                      <el-tag @close='deleRight(rolesList.row.id,item1.id)'  closable type="warning">{{item1.authName}}</el-tag>
                                      <i class="el-icon-arrow-right"></i>
                                  </el-col>
                                  <el-col :span='20'>
                                      <el-tag @close='deleRight(rolesList.row.id,item1.id)'  closable type="success" v-for="(item2,index2) in item1.children" :key="index2">{{item2.authName}}</el-tag>
                                  </el-col>
                              </el-row>
                          </el-col>
                      </el-row>
                      <span v-if="rolesList.row.children.length===0">未分配权限</span>
                  </template>
              </el-table-column>
           <el-table-column type='index' label="#" width="60"></el-table-column>
          <el-table-column prop="rolName" label="角色名称" width="180"></el-table-column>          
          <el-table-column prop="rolDesc" label="角色描述" width="180">  </el-table-column>
          <el-table-column
            label="操作">
            <template slot-scope="rolesList">
                <el-button size='mini' plain type="primary" icon="el-icon-edit" circle
                @click="showedituserbox(rolesList.row)"></el-button>
                <el-button size='mini' :plain="true" type="danger" icon="el-icon-delete" circle
                @click="showdeleuserbox(rolesList.row.id)"></el-button>
                 <el-button size='mini' :plain="true" type="success" icon="el-icon-check" circle
                 @click="showSetRightDia(rolesList.row)"></el-button>
            </template>
          </el-table-column>                          
       </el-table>
    <!-- 角色列表的展示结束 -->

    <!-- 点击修改权限出现的对话框 -->


<el-dialog title="收货地址" :visible.sync="dialogFormVisibleRight">
    <!-- 树形结构
    data->数据源【】
     show-checkbox->显示选择框
     node-key每个节点的唯一标识
     default-expanded-keys默认展开【要展开的节点的id】
     default-checked-keys【要选中的节点的id】
     default-expand-all 展开所有节点
     props配置项{Label,children}
     Label节点的文字标题和children节点的子节点这两者
     的值都来源于data绑定的数据源的key名
     -->

<!-- <el-tree
  :data="treeList"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps">
</el-tree> -->
<el-tree
  ref="tree"
  :data="data"
  show-checkbox
  node-key="id"
  :default-expanded-keys="[2, 3]"
  :default-checked-keys="[5]"
  :props="defaultProps">
</el-tree>
    <!-- 属性结构结束 -->
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
    <el-button type="primary" @click="setRoleRight">确 定</el-button>
  </div>
</el-dialog>
    <!-- 点击修改权限出现的对话框结束 -->
  </el-card>  
</template>
<script>
export default {
        data(){
        return {
            rolesList:[
                {
                    rolName:'主管',
                    rolDesc:'技术负责人',
                    id:3,
                    children:[
                        {
                            authName:'商品管理',
                            children:[{
                                authName:'商品列表',
                                children:[{authName:'三级名字'}]
                            }]
                        }
                    ],   
                }
            ],
            // 修改权限对话框显示属性
            dialogFormVisibleRight:false,
            //树形结构的组件假数据
            data: [{
          id: 1,
          label: '一级 1',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        //树形结构的真数据请求回来的数据
        // treeList:[],
        defaultProps: {
          children: 'children',//children的值是teeeList里的children
          label: 'label'   //label的值 是treeList的authName
        },
        //所有节点的id值
        // arrexpand:[],
        //当前角色所拥有的权限的所有id值
        arrcheck:[],
        //修改权限，点击对话框里的确认按钮，发起修改权限的请求 需要的角色id
        currRoleId:[]
            
        }
    },
    created() {
        // this.getRightsList()
    },
    methods: {
        //修改权限，点击对话框里的确认按钮，发起修改权限的请求
        async setRoleRight(){
            //roles/:roleId/rights
            //roleId 当前要修改权限的角色id
            //rids 树形节点中，所有全选和半选的Label的id  []
            //获取全选的id的数组  组件方法 getCheckedKeys()
            //--1,给要操作的dom元素，设置ref属性值
            //-2，this.$refs.ref属性值.js方法名
           // let arr1 = this.$refs.tree.getCheckedKeys()

            //，获取半选的id的数组 组件方法 getHaLfcheckedKeys()
            //let arr2 = this.$refs.tree.getHaLfcheckedKeys()
           // let arr = [...arr1,...arr2]

            //const res = await this.$http.post('roles/${this.currRoleId}/rights',{rids:arr.join(',')})
            //console.log(res) 
            //更新成功 更新视图 关闭对话框
           // this.getRolesList();
             this.dialogFormVisibleRight = false
        },
        // 修改权限方法--点击出现修改权限的对话框
        async showSetRightDia(role){
            //修改权限，点击对话框里的确认按钮，发起修改权限的请求 需要的角色id
            //this.currRoleId= role.id
            //获取树形结构的权限数据
        //    const res = await this.$http.get('rights/tree');
          //  this.treeList = res.data.data
            //把权限数据里的所有节点的id值放入数组中
            // let arrtemp1 = [];
            // this.treeList.forEach(item=>{
            //     arrtemp1.push(item.id);
            //     item.forEach(item1=>{
            //         arrtemp1.push(item1.id);
            //         item1.forEach(item2=>{
            //             arrtemp1.push(item2.id)
            //         })
            //     })
            // })
            // this.arrexpand = arrtemp1;
            this.dialogFormVisibleRight = true
            //获取当前角色的权限id
            // let arrtemp2 = [];
            // role.children.forEach(item1=>{
            //     //arrtemp2.push(item1.id); 第一层和第二层的id不用放
            //     item1.children.forEach(item2=>{
            //         //arrtemp2.push(item2.id);
            //         item2.children.forEach(item3=>{
            //             arrtemp2.push(item3.id) //因为只要第三层的选中了，它的上级会自动的全选 和办选，这是组件的机制如此
            //         })
            //     })
            // })
            // this.arrcheck = arrtemp2;
        },
        //取消权限的方法
        // async deleRight(roleId,rightId){
        //         const res = await this.$http.delete('roles/${releID}/rights/${rightId}');
        //         console.log(res)
                //删除成功，返回了200和该角色的剩余权限
                // 更新视图
        //         this.getRightsList()
        // },
//--------------//取消权限的方法2，之后更新视图的优化---------                      
        // async deleRight(role,rightId){
        //         const res = await this.$http.delete('roles/${rele.id}/rights/${rightId}');
        //         console.log(res)
                //删除成功，让当前角色的children等于==返回了200和该角色的剩余权限,
                // role.children = res.data.data
        // }
        //获取权限列表数据
         async getRolesList(){
        //         const res = await this.$http.get('/roles')
        //         console.log(res)
        //         this.rolesList = res.data.data
         }
    },
}
</script>
<style lang="less" scoped>
    .addrolebtn{
        margin-top:20px;
    }
</style>