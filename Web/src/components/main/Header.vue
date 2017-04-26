<template>
    <div class="main_header">
        <a class="main_logo" href="#/"><img src="/static/img/logo.png" style="width: 94px;height: 30px;"/></a>
        <div class="main_user">
            <div v-if="login">
                {{ username }}
            </div>
            <div v-else>
                未登录
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        computed:{
            login() {
                return true;
            },
            username(){
                return 'nick';
            }
        }
    }
</script>

<style scoped>
    .main_header {
        display: flex;
        justify-content: space-between;
        text-align: center;
        height: 44px;
        padding: 0px 20px 0px 20px;
        font-size: 15px;
        font-weight: 500;
        background-size: 44px 44px;
        background-color: #fff;
        border-bottom: 1px solid rgba(0, 0, 0, 0.22);
    }
    .main_logo {
        margin: auto 0px;
    }
    .main_user {
        margin: auto 0px;
    }
</style>
