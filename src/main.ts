import { createApp } from 'vue';
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'virtual:svg-icons-register';
import router from './router';
import pinia from './store';
import App from './App.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';
import './permission';

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.use(pinia);
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}
app.mount('#app');
