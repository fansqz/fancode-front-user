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

// markdown
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VueMarkdownEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
// Prism 代码高亮
import Prism from 'prismjs';
import 'prismjs/components/prism-json';
import Particles from 'particles.vue3';

// 热力图
import * as echarts from 'echarts';

import { initDebugWebsocketListen } from './ws/debug';

VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});
VMdPreview.use(vuepressTheme, {
  Prism,
});

const app = createApp(App);

app.use(ElementPlus, {
  //element-plus国际化
  locale: zhCn,
});
app.use(gloalComponent);
app.use(router);
app.use(pinia);
app.use(VueMarkdownEditor);
app.use(VMdPreview);
app.use(Particles);
app.config.globalProperties.$echarts = echarts;
app.mount('#app');

// 初始化调试功能websocket的监控
initDebugWebsocketListen();
