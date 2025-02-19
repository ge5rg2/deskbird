import { createApp } from "vue";
import App from "./App.vue";
import "./style.css";
import i18n from "./i18n";
import { createPinia } from "pinia";
/* import the fontawesome core */
import { library } from "@fortawesome/fontawesome-svg-core";

/* import font awesome icon component */
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

/* import specific icons */
import { faRotate } from "@fortawesome/free-solid-svg-icons";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

/* add icons to the library */
library.add(faRotate, faSpinner);

const pinia = createPinia();
const app = createApp(App);
app.use(i18n);
app.use(pinia);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount("#app");
