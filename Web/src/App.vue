<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
    name: 'app'
}
</script>

<style>
    html {
        padding: 0px;
        margin: 0px;
        display: block;
        -webkit-locale: "zh-CN";
    }
    body {
        padding: 0px;
        margin: 0px;
        display: block;
        font-family: "Helvetica Neue", "Luxi Sans", "DejaVu Sans", Tahoma, "Hiragino Sans GB", "Microsoft Yahei", sans-serif;
    }
    div {
        padding: 0px;
        margin: 0px;
    }
</style>