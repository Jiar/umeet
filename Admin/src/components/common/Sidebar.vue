<template>
    <div class="sidebar">
        <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" theme="dark" unique-opened router>
            <el-menu-item index="/dashboard">
                <i class="el-icon-setting"></i>自述
            </el-menu-item>
            <el-submenu index="2">
                <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
                <el-menu-item index="/dashboard/userlist">用户列表</el-menu-item>
                <el-menu-item index="/dashboard/vuetable">Vue表格组件</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title"><i class="el-icon-date"></i>分类管理</template>
                <el-menu-item index="/dashboard/sortlist">分类列表</el-menu-item>
                <el-menu-item index="/dashboard/vueeditor">编辑器</el-menu-item>
                <el-menu-item index="/dashboard/markdown">markdown</el-menu-item>
                <el-menu-item index="/dashboard/upload">文件上传</el-menu-item>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title"><i class="el-icon-star-on"></i>图表</template>
                <el-menu-item index="/dashboard/basecharts">基础图表</el-menu-item>
                <el-menu-item index="/dashboard/mixcharts">混合图表</el-menu-item>
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
