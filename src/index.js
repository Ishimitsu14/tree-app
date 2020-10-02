import Tree from './components/Tree.vue';

function install(Vue) {
  if (install.installed) return;
  // eslint-disable-next-line no-unused-vars
  install.installed = true;
  Vue.component('v-tree', Tree);
}

const plugin = {
  install,
};

let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

Tree.install = install;

export default Tree;
