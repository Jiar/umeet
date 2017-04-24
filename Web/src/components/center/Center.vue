<template>
    <div class="center_center">
        center_center/Home.vue
        <transition name="move" mode="out-in"><router-view></router-view></transition>
        <v-board></v-board>
    </div>
</template>

<script>
    import vBoard from './Board.vue';
    export default {
        components:{
            vBoard
        }
    }
</script>

<style scoped>
    .center_center {
        text-align: center;
        background-color: #e2e2e2;
        background-image: url(/static/img/shadow_light.png);
        background-repeat: repeat-x;
    }
</style>
