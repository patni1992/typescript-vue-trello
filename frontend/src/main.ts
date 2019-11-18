import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import './styles/main.scss';
//@ts-ignore
import vClickOutside from 'v-click-outside';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faClipboardListCheck } from '@fortawesome/pro-regular-svg-icons';

library.add(faCheck);
library.add(faClipboardListCheck);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(vClickOutside);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
