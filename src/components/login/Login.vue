<template>

    <div class="login_warp">
    <el-form  class="login_form"
    label-width="80px" :model="formdata" label-position="top" > 
        <!-- 用户登录样式 -->
        <h2>用户登录</h2>
        <el-form-item label="用户名">
           <el-input v-model="formdata.username"></el-input>
        </el-form-item>
         <el-form-item label="密码">
           <el-input v-model="formdata.password"></el-input>
         </el-form-item>
         <!-- 添加的按钮 -->
           <el-button @click.prevent="handleLogin"
           class="login_btn" type="primary">登录</el-button>
    </el-form>
    </div>
</template>
<script>
export default {
    data() {
        return {
            formdata:{
                username:'',
                password:''
            }
        }
    },
    methods: {
        // async handleLogin01(){ //用async  和 awate 来简化代码 的写法
        //         const res = await this.$http.post('login',this.formdata)
        //         const {data,meta:{msg,status}} = res.data;
        //         if(status==200){
        //           登录成功，保存token,跳转home ，提示成功data.msg     
        //           localStorage.setItem('token',data.token)
        //           this.$router.push(name:'home') //this.$router.push('/')
        //           this.$message.success(msg)
        //         }else{
        //         this.$message.warning(msg)
        //         }  
        // },
        // 登录请求
        handleLogin(){
            this.$router.push('/');
            this.$message.success('登录成功')
            //  this.$http.post('login',this.formdata).then(res=>{
            //     //  console.log(res)
            //     //找到res.data中的meta对象，然后结构赋值给msg和status
            //     const {data,meta:{msg,status}} = res.data;
            //     if(status==200){
            //       //登录成功，跳转home ，提示成功data.msg
            //       this.$router.push(name:'home') //this.$router.push('/')
            //     //   ，提示成功data.msg
            //       this.$message.success(msg)
            //     }else{
            //     //不成功   1，提示不成功  data.msg
            //     this.$message.warning(msg)
            //     }
            //  })
         }
    },
}
</script>
    
<style lang="less" scoped>
    .login_warp{
        height: 100%;
        background-color:#324152;
        display: flex;
        justify-content: center;
        align-items: center;
        .login_form{
            width:400px;
            background-color: #fff;
            border-radius:5px;
            padding: 30px;
        }
        .login_btn{
            width: 100%;
        }
    }
</style> 

