import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store'

import 'element-ui/lib/theme-default/index.css'    // 默认主题
// import '../static/css/theme-green/index.css'       // 浅绿色主题
// import "babel-polyfill"
Vue.use(ElementUI)
Vue.config.devtools = true;
Vue.config.productionTip = true;

let vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});

store.subscribe((mutation, state) => {
    if(mutation.payload.error) {
        let error = mutation.payload.error;
        vue.$message({
            message: error.msg,
            type: 'error'
        });
        if (error.error && (error.code == 411001 || error.code == 411002 || error.code == 411003)) {
            location.href = '/#/';
        }
    }
})
