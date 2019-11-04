<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" router="true">
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/postvideo">投稿视频</el-menu-item>
        <el-menu-item index="/about">关于</el-menu-item>
    </el-menu>
</template>

<script>
    export default {
        name: "top_navi"
    }
</script>

<style scoped>
    .el-menu-demo{
        margin-bottom: 10px;
    }
</style>