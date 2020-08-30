import './assets/scss/app.scss';
import Vue from 'vue';
import VModal from 'vue-js-modal';
import VTooltip from 'v-tooltip';
import App from './App.vue';
import helper from './helper';
// eslint-disable-next-line import/prefer-default-export
export const eventBus = new Vue();
Vue.use(VModal, { componentName: 'modal' });
Vue.config.productionTip = false;
Vue.prototype.$helper = helper;
Vue.use(VTooltip, { defaultOffset: 5 });

new Vue({
  render: (h) => h(App),
}).$mount('#app');
