import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false


import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';

const socket = io('http://localhost:5001', { path: '/payments/socket' });

Vue.use(VueSocketIOExt, socket);

import { store } from './store'
import IotaPayment from 'vue-iota-payment'
Vue.use(IotaPayment, { store, path: '/payments' })


new Vue({
  store,
  render: h => h(App),
}).$mount('#app')
