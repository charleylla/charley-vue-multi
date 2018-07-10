import Vue from "vue";
import Tpl from "./template.vue";
import "@assets/style/main.scss";

new Vue({
  render:h => h(Tpl),
}).$mount("#app");
