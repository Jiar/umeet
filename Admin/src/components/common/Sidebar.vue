<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="/dashboard">
                <i class="el-icon-setting"></i>自述
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                <el-menu-item index="/dashboard/userlist">用户列表</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-menu"></i>分类管理</template>
                <el-menu-item index="/dashboard/sortlist">分类列表</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-menu"></i>帖子管理</template>
                <el-menu-item index="/dashboard/postlist">帖子列表</el-menu-item>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title"><i class="el-icon-menu"></i>评论管理</template>
                <el-menu-item index="/dashboard/commentlist">评论列表</el-menu-item>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title"><i class="el-icon-star-on"></i>示例用法</template>
                <el-menu-item index="/example/basetable">基础表格</el-menu-item>
                <el-menu-item index="/example/vuetable">Vue表格组件</el-menu-item>
                <el-menu-item index="/example/baseform">基本表单</el-menu-item>
                <el-menu-item index="/example/vueeditor">编辑器</el-menu-item>
                <el-menu-item index="/example/markdown">markdown</el-menu-item>
                <el-menu-item index="/example/upload">文件上传</el-menu-item>
                <el-menu-item index="/example/basecharts">基础图表</el-menu-item>
                <el-menu-item index="/example/mixcharts">混合图表</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        // computed:{
        //     onRoutes(){
        //         return this.$route.path.replace('/','');
        //     }
        // }
    }
</script>

<style scoped>
    .sidebar{
        display: block;
        position: absolute;
        width: 250px;
        left: 0;
        top: 70px;
        bottom:0;
        background: #2E363F;
    }
    .sidebar > ul {
        height:100%;
    }
</style>
