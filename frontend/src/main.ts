import Vue from 'vue';
import './registerServiceWorker';
import './styles/main.scss';
// @ts-ignore
import vClickOutside from 'v-click-outside';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faCheck, faClipboardListCheck, faSignOutAlt, faPlus, faTrashAlt } from '@fortawesome/pro-regular-svg-icons';
import store from './store';
import router from './router';
import App from './App.vue';

library.add(faCheck);
library.add(faClipboardListCheck);
library.add(faSignOutAlt);
library.add(faPlus);
library.add(faTrashAlt);

Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.use(vClickOutside);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app');
