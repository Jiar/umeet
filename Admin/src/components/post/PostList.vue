<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 帖子管理</el-breadcrumb-item>
                <el-breadcrumb-item>帖子列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="posts.rows" border style="width: 100%">
            <el-table-column prop="id" label="编号" sortable>
            </el-table-column>
            <el-table-column prop="sort.title" label="分类" sortable>
            </el-table-column>
            <el-table-column prop="user.name" label="用户" sortable>
            </el-table-column>
            <el-table-column prop="title" label="标题" sortable>
            </el-table-column>
            <el-table-column prop="type" label="类型" sortable>
            </el-table-column>
            <el-table-column prop="isModified" label="是否修改" sortable>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" sortable>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :page-sizes="pageSizes"
                    :total="total"
                    @current-change="pageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    export default {
        data() {
            return {
                currentPage: 1,
                pageSizes: [15],
                total: 0,
            };
        },
        computed: {
            ...mapGetters({
                posts: 'posts'
            })
        },
        beforeMount() {
            this.getPostList();
        },
        methods: {
            getPostList() {
                const self = this;
                self.$store.dispatch('posts', {
                    page: self.currentPage,
                    order: 'id asc',
                    limit: self.pageSizes[0]
                }).then( result => {
                    if (result.code) {
                        Message({
                            type: 'error',
                            showClose: true,
                            message: result.msg
                        });
                    } else {
                        self.total = result.count;
                    }
                });
            },
            pageChange(currentPage) {
                this.currentPage = currentPage;
                this.getPostList();
            }
        }
    }
</script>