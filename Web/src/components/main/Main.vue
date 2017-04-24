<template>
    <div class="main_main">
        <v-header></v-header>
        <v-center></v-center>
        <v-footer></v-footer>
    </div>
</template>

<script>
    import vHeader from './Header.vue';
    import VCenter from '../center/Center.vue';
    import vFooter from './Footer.vue';
    export default {
        components:{
            vHeader, VCenter, vFooter
        }
    }
</script>

<style scoped>
    
</style>
