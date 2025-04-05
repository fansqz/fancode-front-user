import { createApp } from 'vue';
import App from '@/App.vue';
// 引入element-plus插件
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// 配置element-plus国际化
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import zhCn from 'element-plus/dist/locale/zh-cn.mjs';
// svg配置
import 'virtual:svg-icons-register';
// 全局组件
import gloalComponent from '@/components';
// 路由
import router from '@/router';
// 仓库
import pinia from '@/store';
// 引入路由鉴权文件
import './premisstion';
// 全局样式
import '@/styles/index.scss';
import Particles from 'particles.vue3';
// 热力图
import * as echarts from 'echarts';
import { loadWASM } from 'onigasm';

// markdowm
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import Prism from 'prismjs';

const app = createApp(App);

// 初始化编辑器
const initCodeEditor = async (_app) => {
  // 需要加载onigasm.wasm文件
  await loadWASM(`/onigasm/onigasm.wasm`);
};

// 初始化markdown编辑器
const initMarkdowmEditor = (app) => {
  VMdPreview.use(vuepressTheme, {
    c,
  });
  // Prism 代码高亮
  app.use(Particles);
  app.use(VMdPreview);
};

app.use(ElementPlus, {
  //element-plus国际化
  locale: zhCn,
});
app.use(gloalComponent);
app.use(router);
app.use(pinia);
app.config.globalProperties.$echarts = echarts;
app.mount('#app');

initCodeEditor(app);
initMarkdowmEditor(app);
