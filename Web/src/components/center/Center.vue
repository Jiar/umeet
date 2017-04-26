<template>
    <div class="center_center">
        <v-board></v-board>
        <div style="height: 20px"></div>
        <transition name="move" mode="out-in">
            <div class="center_content">
                <router-view></router-view>
            </div>
        </transition>
        <div style="height: 20px"></div>
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
    .center_content {
        min-width: 600px;
        max-width: 1100px;
        width: auto;
        margin: 0px 310px 0px 20px;
        background-color: #fff;
        border-radius: 3px;
        box-shadow: 0px 2px 3px rgba(0, 0, 0, 0.1);
        border-bottom: 1px solid #e2e2e2;
    }
</style>
