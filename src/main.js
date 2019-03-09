import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import ace from 'ace-builds'
import persist from '@/util/persist'

Vue.config.productionTip = true

Vue.use(ElementUI)
Vue.use(ace)

new Vue({
    router,
    store,
    render: h => h(App),
    methods: {
        checkLogin() {
            console.info('Check login.')
        },
    },
    mounted() {
        persist.restoreToken();
        persist.restoreUserInfo();
        this.checkLogin();
    },
    watch: {
        '$route': 'checkLogin',
    },
}).$mount('#app')
