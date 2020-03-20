<template>
    <el-card class="box_card">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/">
           <el-breadcrumb-item>首页</el-breadcrumb-item>
           <el-breadcrumb-item>用户管理</el-breadcrumb-item>
           <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 搜索 -->
        <el-row class="row_search">
            <el-col :span="24">
                <!-- 搜索框 -->
               <el-input clearable class="input_search" placeholder="请输入内容" v-model="query">
                  <el-button 
                  @click='searchbutton'
                  slot="append" icon="el-icon-search"></el-button>
               </el-input>
               <el-button type="success" @click="showadduserdia">添加用户</el-button>
           </el-col>
        </el-row>
        <!-- 表格 -->
        <el-table
        :data="tableData"
        style="width: 100%">
        <!-- 每一行累加type='index' -->
          <el-table-column
           type='index'
            label="#"
            width="60">
          </el-table-column>
          <el-table-column
            prop="name"
            label="姓名"
            width="80">
          </el-table-column>          
          <el-table-column
            prop="name"
            label="邮箱"
            width="80">
          </el-table-column>
          <el-table-column
            prop="address"
            label="电话">
          </el-table-column>
          <el-table-column
            prop="address"
            label="创建日期">
          </el-table-column>
          <!-- 日期过滤器的使用
          1,如果单元格内容显示的不是字符串和文字，在外层包裹template
          2,temalate设置slot-scope属性，值是要用的数据的数据源，userList
          3,userList.row=数组中的每个对象
              <el-table-column
            label="创建日期">
                <template slot-scope='userList'>
                    {{userList.row.item | fmtdate}}
                </template>
          </el-table-column>-->
          <el-table-column
            label="用户状态">
            <template slot-scope="tableData">
                <el-switch
                @change="changeMgState(tableData.row)"
                 v-model="tableData.row.status"
                 active-color="#13ce66"
                inactive-color="#ff4949">
                </el-switch>
            </template>
          </el-table-column>    
          <el-table-column
            label="操作">
            <template slot-scope="tableDate">
                <el-button size='mini' plain type="primary" icon="el-icon-edit" circle
                @click="showedituserbox(tableDate.row)"></el-button>
                <el-button size='mini' :plain="true" type="danger" icon="el-icon-delete" circle
                @click="showdeleuserbox(tableDate.row.id)"></el-button>
                 <el-button size='mini' :plain="true" type="success" icon="el-icon-check" circle
                 @click="showsetuserroledia(tableDate.row)"></el-button>
            </template>
          </el-table-column>                          
       </el-table>
        <!-- 分页 -->
          <div class="block">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
           :current-page="pagenum"
            :page-sizes="[2, 4, 6, 8]"
           :page-size="2"
            layout="total, sizes, prev, pager, next, jumper"
           :total="400">
           </el-pagination>
          </div>
      <!-- 添加用户的对话框 -->
        <el-dialog title="添加用户" :visible.sync="dialogFormVisibleadd">
           <el-form :model="form">
              <el-form-item label="用户名" label-width="100px">
                <el-input v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="密码" label-width="100px">
                <el-input v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
              </el-form-item>                            
             </el-form>
             <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibleadd = false">取 消</el-button>
                  <el-button type="primary" @click="adduser">确 定</el-button>
              </div>
          </el-dialog>
      <!-- 添加用户对话框结束 -->
      <!-- 编辑按钮显示的对话框 -->
        <el-dialog title="编辑用户" :visible.sync="dialogFormVisibledit">
           <el-form :model="form">
              <el-form-item label="用户名" label-width="100px">
                <el-input disabled v-model="form.username" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" label-width="100px">
                <el-input v-model="form.email" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="电话" label-width="100px">
                <el-input v-model="form.mobile" autocomplete="off"></el-input>
              </el-form-item>                            
             </el-form>
             <div slot="footer" class="dialog-footer">
                  <el-button @click="dialogFormVisibledit = false">取 消</el-button>
                  <el-button type="primary" class="dituser">确 定</el-button>
              </div>
          </el-dialog>      
      <!-- 编辑按钮显示的对话框结束 -->
      <!-- 分配角色按钮显示的对话框 -->
          <el-dialog title="分配角色" :visible.sync="dialogFormVisiblerol">
            <el-form :model="form">
              <el-form-item label="用户名" label-width="100px">
                当前用户的用户名currusername{{currroleid}}
              </el-form-item>
              <el-form-item label="角色" label-width="100px">
                <!-- 如果select绑定的数据和option的value一样，就会显示label的值 -->
                <el-select v-model="currroleid">
                  <el-option label=请选择 :value="1"></el-option>
                  <!-- <el-option label="请求回来的角色名字遍历得到" value="beijing"></el-option> -->
                  <el-option :label='item.roleName'
                  :value="item.id"
                   v-for="(item,i) in roles" :key='i'>
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisiblerol = false">取 消</el-button>
              <el-button type="primary" @click="setrole">确 定</el-button>
            </div>
          </el-dialog>
      <!-- 分配角色按钮显示的对话框结束 -->
    </el-card>
</template>
<script>
export default {
    data() {
        return {
            query:'',
            // 分页数据
            tatal:-1,
            pagenum:1,
            pagesize:2,
            // 表格绑定的数据
            //userList:[];
            tableData: [{
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄',
            status:true,
            id:2
          },{
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄',
            status:false,
            id:3
          }],
          // 添加对话框的属性
          dialogFormVisibleadd:false,
          // from表单的数据
          form:{
            username:'',
            password:'',
            email:'',
            mobile:''
          },
          //编辑按钮对话框，显示隐藏属性
          dialogFormVisibledit:false,
          //分配按钮 =对话框，显示隐藏属性
          dialogFormVisiblerol:false,
          //分配角色对话框，的数据
          currroleid:0,
          //分配角色显示的用户名
          currusername:'',
          //保存请求回的所有角色数据
          roles:[],
          //保存请求回的角色id值
          curruserid:-1
        }
    },
    created() {
        // 发请求获取 表格数据
        // this.getUserList()
    },
    methods: {
      //分配角色，修改角色发起请求
      async setrole(){
              // const res = await this.$http.put('users/${this.curruserid}/role',{
                // rid:this.currroleid
              // });
              // console.log(res);
              //关闭对话框
              this.dialogFormVisiblerol=false;
              //弹框提示信息
              this.$message.success('修改成功')
      },
      //分配校色 按钮点击显示 对话框
      async showsetuserroledia(user){
        // this.currusername=user.username
        //给curruserid赋值
        //this.curruserid = user.id
        //获取所有的角色
        // const res1 = await this.$http.get('roles');
        // console.log(res1)
        // this.rles = res1.data.data

        // 获取当前用户的角色id->rid
        // const res = await this.$http.get('user/${user.id}')
        // console.log(res)
        //把选中的用户的角色id 等于绑定的curroleid
        // this.currroleid = res.data.rid
         this.dialogFormVisiblerol=true;
      },
      //用户的状态切换
      async changeMgState(user){
              const res = await this.$http.put('user/${user.id}/state/${user.mg_state}');
              console.log(res)
      },
      // 编辑用户信息 发送请求
      async dituser(){
        const res = await this.$http.put('user/$(this.form.id)',this.form);
         this.dialogFormVisibledit=false;
         this.getUserList();       
      },
      //编辑用户按钮，点击显示对话框组件
      showedituserbox(user){
        this.dialogFormVisibledit=true;
        this.form = user;
        console.log(this.form)

      },
      //删除用户--显示确认删除对话框
      showdeleuserbox(id){
         this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then( async () => {
          const res = await this.$http.delete('users/${id}');
          console.log(res);
          if(res.data.meta.status==200){ 
            //更新视图
            this.getUserList();
            this.$message({
            type: 'success',
            message: res.data.meta.msg
          });
          } 
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //添加用户--发送请求
      async adduser(){
              alert('接口问题一切功能已经注释')
              //关闭对话框
              // this.dialogFormVisibleadd==false;
              // const res = await this.$http.post('user',this.form);
              // console.log(res); 
              // const {meta:{status,msg},data} = res.data
              // if(status===201){
                //提示成功
                // this.$message.success(msg);
                //更新视图
                // this.getUserList()
                //清空文本框
                // this.form = {}
              // }else{this.$message.warning(msg)}
      },
      //添加用户--显示对话框
      showadduserdia(){
        this.form={};
        this.dialogFormVisibleadd=true;
      },
      //搜索功能
      searchbutton(){
        console.log('aaa')
        this.getUserList();
      },
        //分页方法
        handleSizeChange(val) {
          // this.pagesize=val;
          // this.getUserList()
                console.log(`每页 ${val} 条`);
          },
        handleCurrentChange(val) {
          //  this.pagenum=val;
          //  this.getUserList()         
               console.log(`当前页: ${val}`);
         },
        async getUserList(){
            //query 查询参数，可以为空 搜索输入框绑定的数据
            //pagenu 当前页码 不能为空  不能写死，后序做分页
            //pagesize 每页显示条数 不能为空  不能写死，后序做分页
            //需要授权的API 在请求头中提供token令牌
            // const AUTH_TOKEN = localStorage.getItem('token');
            // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN;
            // const res = await this.$http.get('users?query=${this.query}&pagenum=${this.pagenum}&pagesize=&{this.pagesize}');
            // console.log(res)
            //const {meta:{status,msg},data:{user,total}} = res.data
            //if(status===200){
                //给表格数据赋值
                //this.userList = users                
                //给total 表格总数赋值
                //this.tatal = tatal

            //}
        }
    },
    
}
</script>
<style lang="less" scoped>
    .box_card{
        height:100%;
    }
    .row_search{
        margin-top:20px;
    }
    .input_search{
        width:300px;
    }
</style>