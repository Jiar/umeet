<template>
    <div class="table">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-menu"></i> 用户管理</el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <el-table :data="users.rows" border style="width: 100%">
            <el-table-column prop="id" label="编号" sortable width="120">
            </el-table-column>
            <el-table-column prop="name" label="名字" sortable width="150">
            </el-table-column>
            <el-table-column prop="email" label="邮箱" sortable>
            </el-table-column>
            <el-table-column prop="score" label="积分" sortable>
            </el-table-column>
            <!--<el-table-column prop="tag" label="标签" width="120"
                    :filters="[{ text: '家', value: '家' }, { text: '公司', value: '公司' }]"
                    :filter-method="filterTag">
                <template scope="scope">
                    <el-tag :type="scope.row.tag === '家' ? 'primary' : 'success'" close-transition>{{scope.row.tag}}
                    </el-tag>
                </template>
            </el-table-column>-->
            <!--<el-table-column label="操作" width="180">
                <template scope="scope">
                    <el-button size="small"
                            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger"
                            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>-->
        </el-table>
        <div class="pagination">
            <el-pagination
                    layout="prev, pager, next"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="total"
                    @current-change="pageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';
    import { Message } from 'element-ui';
    export default {
        data() {
            return {
                currentPage: 1,
                pageSize: 15,
                total: 0,
            };
        },
        computed: {
            ...mapGetters({
                users: 'users'
            })
        },
        beforeMount() {
            this.getUserList();
        },
        methods: {
            getUserList() {
                const self = this;
                self.$store.dispatch('users', {
                    page: self.currentPage,
                    order: 'id asc',
                    limit: self.pageSize
                }).then( result => {
                    if (result.error) {
                        Message({
                            type: 'error',
                            showClose: true,
                            message: result.msg
                        });
                    } else {
                        self.pageSize = result.limit;
                        self.currentPage = result.page;
                        self.total = result.count;
                    }
                });
            },
            pageChange(currentPage) {
                this.currentPage = currentPage;
                this.getUserList();
            },
            // formatter(row, column) {
            //     return row.address;
            // },
            // filterTag(value, row) {
            //     return row.tag === value;
            // },
            // handleEdit(index, row) {
            //     this.$message('编辑第'+(index+1)+'行');
            // },
            // handleDelete(index, row) {
            //     this.$message.error('删除第'+(index+1)+'行');
            // }
        }
    }
</script>