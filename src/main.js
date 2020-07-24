import Vue from 'vue';
import App from './App.vue';
import helper from './helper';

Vue.config.productionTip = false;
Vue.prototype.$helper = helper;

new Vue({
  render: (h) => h(App),
}).$mount('#app');
