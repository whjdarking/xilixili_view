<template>
    <el-menu class="el-menu-demo" mode="horizontal" text-color="#949390" router>
        <el-menu-item index="/" style="font-weight: bold">首页</el-menu-item>
        <el-menu-item index="/postvideo" style="font-weight: bold">投稿视频</el-menu-item>
        <el-menu-item index="/about" style="font-weight: bold">关于</el-menu-item>
        <el-menu-item index="/userlogin" class="dock-right" style="font-weight: bold">登录/注册</el-menu-item>

    </el-menu>
</template>

<script>
export default {
    name: "top_navi"
}
</script>

<style scoped>
.el-menu--horizontal > .el-menu-item.dock-right {
    float: right;
}
.el-menu-demo {
    margin-bottom: 10px;
}
</style>