import { createApp } from 'vue';
import './style.css';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
import 'virtual:svg-icons-register';
import router from './router';
import pinia from './store';
import App from '@/App.vue';

const app = createApp(App);
app.use(ElementPlus, { locale: zhCn });
app.use(router);
app.use(pinia);
app.mount('#app');
