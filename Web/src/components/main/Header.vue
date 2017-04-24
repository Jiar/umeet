<template>
    <div class="main_header">
        main_header/Header.vue
        <div class="logo">umeet</div>
        <div v-if="login">
            {{ username }}
        </div>
        <div v-else>
            未登录
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

</style>
