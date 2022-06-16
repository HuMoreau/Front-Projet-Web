import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router'
import PrimeVue from 'primevue/config'
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from "primevue/inputtext";
import Chart from 'primevue/chart';
import SelectButton from "primevue/selectbutton";

import 'primevue/resources/themes/lara-light-blue/theme.css'     //theme
import './css/general-styling.css'                       //personal theme
import 'primevue/resources/primevue.min.css'               //core css
import 'primeicons/primeicons.css'                         //icons
import 'primeflex/primeflex.css'                           //primeflex

Vue.config.productionTip = false
Vue.use(PrimeVue);
Vue.use(VueRouter);
Vue.component('MenuBar', Menubar);
Vue.component('AvatarIcon', Avatar);
Vue.component('PrimeButton', Button);
Vue.component('DropDown', Dropdown);
Vue.component('InputText', InputText);
Vue.component('PrimeChart', Chart);
Vue.component('SelectButton', SelectButton);

const router = new VueRouter({
  routes,
  mode: 'history',
})

new Vue({
  router : router,
  render: h => h(App),
}).$mount('#app')
