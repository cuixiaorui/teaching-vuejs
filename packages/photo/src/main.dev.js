import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./assets/css/photo.css";
import "nprogress/nprogress.css";

import "element-ui/lib/theme-chalk/index.css";
import Element from "element-ui";

Vue.config.productionTip = false;

console.log("heiheihei");
Vue.use(Element);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
