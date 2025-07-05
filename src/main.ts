import { createApp } from 'vue'

import VMdPreview from '@kangc/v-md-editor/lib/preview'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import * as echarts from 'echarts'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import Particles from 'particles.vue3'
import Prism from 'prismjs'

import App from '@/App.vue'
// 引入element-plus插件
import 'element-plus/dist/index.css'
// 配置element-plus国际化
// svg配置
import 'virtual:svg-icons-register'
// 全局组件
import gloalComponent from '@/components'
// 路由
import router from '@/router'
// 仓库
import pinia from '@/store'

// 引入路由鉴权文件
import './premisstion'
// 全局样式
import '@/styles/index.scss'
// 热力图
// markdowm
import '@kangc/v-md-editor/lib/style/preview.css'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'

const app = createApp(App)

// 初始化markdown编辑器
const initMarkdowmEditor = (app) => {
  VMdPreview.use(vuepressTheme, {
    Prism,
  })
  VMdPreview.xss.extend({
    // 扩展白名单
    whiteList: {
      iframe: ['src', 'width', 'height', 'frameborder', 'allowfullscreen'],
      source: [],
    },
  })
  // Prism 代码高亮
  app.use(Particles)
  app.use(VMdPreview)
}

app.use(ElementPlus, {
  //element-plus国际化
  locale: zhCn,
})
app.use(gloalComponent)
app.use(router)
app.use(pinia)
app.config.globalProperties.$echarts = echarts
app.mount('#app')

initMarkdowmEditor(app)
