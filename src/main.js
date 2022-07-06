import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import routes from './router'
import { createPinia, PiniaVuePlugin } from 'pinia';
import piniaPersist from 'pinia-plugin-persist';
import axios from 'axios';
import PrimeVue from 'primevue/config'
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from "primevue/inputtext";
import Chart from 'primevue/chart';
import SelectButton from "primevue/selectbutton";
import InputSwitch from "primevue/inputswitch";
import Dialog from "primevue/dialog";
import AutoComplete from "primevue/autocomplete";
import Panel from "primevue/panel";
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Textarea from 'primevue/textarea';
import Password from 'primevue/password';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';


import 'primevue/resources/themes/lara-light-blue/theme.css'     //theme
import './css/general-styling.css'                       //personal theme
import 'primevue/resources/primevue.min.css'               //core css
import 'primeicons/primeicons.css'                         //icons
import 'primeflex/primeflex.css'                       //primeflex

Vue.config.productionTip = false
Vue.use(PrimeVue);
Vue.use(VueRouter);
Vue.use(PiniaVuePlugin)
Vue.use(ToastService);
Vue.component('MenuBar', Menubar);
Vue.component('AvatarIcon', Avatar);
Vue.component('PrimeButton', Button);
Vue.component('DropDown', Dropdown);
Vue.component('InputText', InputText);
Vue.component('PrimeChart', Chart);
Vue.component('SelectButton', SelectButton);
Vue.component('InputSwitch', InputSwitch);
Vue.component('PrimeDialog', Dialog);
Vue.component('AutoComplete', AutoComplete);
Vue.component('PrimePanel', Panel);
Vue.component('PrimeAccordion', Accordion);
Vue.component('AccordionTab', AccordionTab);
Vue.component('TextArea', Textarea);
Vue.component('PassWord', Password);
Vue.component('PrimeToast', Toast);

const router = new VueRouter({
  routes,
  mode: 'history',
})

const pinia = createPinia()
pinia.use(piniaPersist);

export const apiService = axios.create({
  baseURL: 'http://localhost:9090/api/',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

export const quoteService = axios.create({
  baseURL: 'https://api.function.divlo.fr/functions/randomQuote',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

let isAuth = window.localStorage.getItem("user") ?
    JSON.parse(window.localStorage.getItem("user")).isAuth : false;

router.beforeEach( async (to, from, next) => {
  console.log("isAuth", isAuth);
  if(!isAuth && to.name !== 'Authentication'){
    router.push('/auth');
  }
  next();
})

new Vue({
  router : router,
  pinia,
  render: h => h(App),
}).$mount('#app')

import {useAuthStore} from "@/store/authStore";
import {storeToRefs} from "pinia";
const authStore = useAuthStore();
isAuth = storeToRefs(authStore);