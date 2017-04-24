import Vue from 'vue'
import ElementUI from 'element-ui'
import App from './App'
import router from './router'
import store from './store'

Vue.config.devtools = true;
Vue.config.productionTip = true;
Vue.use(ElementUI)

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
        if (error.code == 411001 || error.code == 411002 || error.code == 411003) {
            location.href = '/#/';
        }
    }
})
