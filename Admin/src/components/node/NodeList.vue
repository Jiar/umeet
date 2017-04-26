<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <datasource language="zh-CN" :table-data="nodes.rows" :columns="columns" :pagination="pagination"
                :actions="actions"
                v-on:change="changePage"
                v-on:searching="onSearch"></datasource>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import Datasource from 'vue-datasource';
    import { Message } from 'element-ui';
    export default {
        data: function() {
            const self = this;
            return {
                columns: [
                    {
                        name: '编号',
                        key: 'id'
                    },
                    {
                        name: '父编号',
                        key: 'pid'
                    },
                    {
                        name: '标题',
                        key: 'title'
                    },
                    {
                        name: '描述',
                        key: 'description'
                    },
                    {
                        name: '创建时间',
                        key: 'createTime'
                    }
                ],
                pagination:{
                    current_page: 1,
                    per_page: 15, //pagesize
                    total: 0,
                    last_page: 1, //totalpage
                    from: 1,
                    to: 5
                },
                actions: [
                    {
                        text: 'Click',
                        class: 'btn-primary',
                        event(e, row) {
                            if (row != null) {
                                self.$message('选中的行数：' + (Number(row.index)+1));
                            } else {
                                self.$message('请先选中行');
                            }
                        }
                    }
                ],
                query:''
            }
        },
        computed: {
            ...mapGetters({
                nodes: 'nodes'
            })
        },
        components: {
            Datasource
        },
        beforeMount(){
            this.getNodeList();
        },
        methods: {
            getNodeList() {
                const self = this;
                self.$store.dispatch('nodes', {
                    page: self.pagination.current_page,
                    order: 'id asc',
                    limit: self.pagination.per_page
                }).then( result => {
                    if (result.error) {
                        Message({
                            type: 'error',
                            showClose: true,
                            message: result.msg
                        });
                    } else {
                        self.pagination.current_page = result.page;
                        self.pagination.per_page = result.limit;
                        self.pagination.total = result.count;
                        self.pagination.last_page = result.pages;
                        self.pagination.from = (self.pagination.current_page-1)*self.pagination.per_page+1;
                        let to = self.pagination.current_page*self.pagination.per_page;
                        if (to > self.pagination.total) {
                            self.pagination.to = self.pagination.total;
                        } else {
                            self.pagination.to = to;
                        }
                    }
                });
            },
            changePage(values) {
                this.pagination.per_page = values.perpage;
                this.pagination.current_page = values.page;
                this.getNodeList();
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        }
    }
</script>

<style>
    .vue-datasource *{
        box-sizing: border-box;
        font-size: 14px;
    }
    .vue-datasource .panel {
        margin-bottom: 22px;
        background-color: #fff;
        border: 1px solid transparent;
        border-radius: 4px;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
    }
    .vue-datasource .panel-default {
        border-color: #d3e0e9;
    }
    .vue-datasource .panel-heading {
        padding: 10px 15px;
        border-bottom: 1px solid transparent;
        border-top-right-radius: 3px;
        border-top-left-radius: 3px;
    }
    .vue-datasource .panel-default > .panel-heading {
        height:56px;
        color: #333333;
        background-color: #fff;
        border-color: #d3e0e9;
    }
    .vue-datasource .pull-left {
        float: left !important;
    }
    .vue-datasource .pull-right {
        float: right !important;
    }
    .vue-datasource .form-group {
        margin-bottom: 15px;
    }
    .vue-datasource label {
        display: inline-block;
        max-width: 100%;
        margin-bottom: 5px;
        font-weight: bold;
    }
    .vue-datasource .form-control {
        display: block;
        width: 100%;
        height: 36px;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.6;
        color: #555555;
        background-color: #fff;
        background-image: none;
        border: 1px solid #ccd0d2;
        border-radius: 4px;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
        -webkit-transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
        transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
    }
    .vue-datasource .btn {
        display: inline-block;
        margin-bottom: 0;
        font-weight: normal;
        text-align: center;
        vertical-align: middle;
        touch-action: manipulation;
        cursor: pointer;
        background-image: none;
        border: 1px solid transparent;
        white-space: nowrap;
        padding: 6px 12px;
        font-size: 14px;
        line-height: 1.6;
        border-radius: 4px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }
    .vue-datasource .btn-primary {
        color: #fff;
        background-color: #3097D1;
        border-color: #2a88bd;
    }
    .vue-datasource .table {
        width: 100%;
        max-width: 100%;
        margin-bottom: 22px;
        border-collapse: collapse;
        border-spacing: 0;
    }
    .vue-datasource .table > thead > tr > th {
        vertical-align: bottom;
        border-bottom: 2px solid #ddd;
    }
    .vue-datasource .table th ,.vue-datasource .table td {
        padding: 8px;
        line-height: 1.6;
        vertical-align: top;
        border-top: 1px solid #ddd;
    }
    .vue-datasource .table-striped > tbody > tr:nth-of-type(odd) {
        background-color: #f9f9f9;
    }
    .vue-datasource .success th ,.vue-datasource .success td{
        background-color: #dff0d8;
    }
    .vue-datasource .pagination {
        display: inline-block;
        padding-left: 0;
        margin: 22px 0;
        border-radius: 4px;
    }
    .vue-datasource .pagination > li {
        display: inline;
    }
    .pagination > li > a,.pagination > li > span {
        position: relative;
        float: left;
        padding: 6px 12px;
        line-height: 1.6;
        text-decoration: none;
        color: #3097D1;
        background-color: #fff;
        border: 1px solid #ddd;
        margin-left: -1px;
    }
    .pagination > .disabled > span, .pagination > .disabled > span:hover, .pagination > .disabled > span:focus, .pagination > .disabled > a, .pagination > .disabled > a:hover, .pagination > .disabled > a:focus {
        color: #777777;
        background-color: #fff;
        border-color: #ddd;
        cursor: not-allowed;
    }
    .pagination > .active > a, .pagination > .active > a:hover, .pagination > .active > a:focus, .pagination > .active > span, .pagination > .active > span:hover, .pagination > .active > span:focus {
        z-index: 3;
        color: #fff;
        background-color: #3097D1;
        border-color: #3097D1;
        cursor: default;
    }
    .vue-datasource .pagination > li:first-child > a, .vue-datasource .pagination > li:first-child > span {
        margin-left: 0;
        border-bottom-left-radius: 4px;
        border-top-left-radius: 4px;
    }
    .vue-datasource .text-center {
        text-align: center;
    }
    @media (min-width: 768px){
        .form-inline .form-group {
            display: inline-block;
            margin-bottom: 0;
            vertical-align: middle;
        }
        .form-inline .control-label {
            margin-bottom: 0;
            vertical-align: middle;
        }
        .form-inline .form-control {
            display: inline-block;
            width: auto;
            vertical-align: middle;
        }
    }
</style>