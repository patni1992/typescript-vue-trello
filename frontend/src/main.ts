import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';
//@ts-ignore
import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
