import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import i18n from "./i18n";
import { createPinia } from "pinia";

const pinia = createPinia();
const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.mount("#app");
