<template>
    <el-card class="box_goodslist">
        <div>商品列表</div>
          <el-button type="primary" @click="$router.push('/goodsadd')">添加商品</el-button>
    </el-card>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
    .box_goodslist{
        height: 100%;
    }
</style>