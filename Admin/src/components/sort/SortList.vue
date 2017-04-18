<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 分类管理</el-breadcrumb-item>
                <el-breadcrumb-item>分类列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <datasource language="zh-CN" :table-data="sorts.rows" :columns="columns" :pagination="pagination"
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
                sorts: 'sorts'
            })
        },
        components: {
            Datasource
        },
        beforeMount(){
            this.getSortList();
        },
        methods: {
            getSortList() {
                const self = this;
                self.$store.dispatch('sorts', {
                    page: self.pagination.current_page,
                    order: 'id asc',
                    limit: self.pagination.per_page
                }).then( result => {
                    if (result.code) {
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
                this.getSortList();
            },
            onSearch(searchQuery) {
                this.query = searchQuery;
            }
        }
    }
</script>

<style src="../../../static/css/datasource.css"></style>
