

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' 
import App from './App.vue'
import router from './router'
import '@/styles/common.scss'

// 引入全局组件插件
import { componentPlugin } from '@/components'


import { lazyPlugin } from '@/directives'
const app = createApp(App)
const pinia = createPinia() 
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(router)
app.use(lazyPlugin)
app.mount('#app')
app.use(componentPlugin)
