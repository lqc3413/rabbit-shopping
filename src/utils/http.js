import axios from 'axios'
import { ElMessage } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import { useUserStore } from '@/stores/user'  
import router from '@/router'
// 创建axios实例
const http = axios.create({
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net',
  timeout: 50000
})

// axios请求拦截器
http.interceptors.request.use(config => {
  const useStore = useUserStore()
  const token = useStore.userInfo.token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e),

)

// axios响应式拦截器
http.interceptors.response.use(res => res.data, e => {
  ElMessage({
    type: 'error',
    message: '您的登录已过期，请重新登录'
  })

    const useStore = useUserStore()
  if(e.response.status === 401) {
  useStore.reomveUserInfo()
  router.push('/login')
  }
    
  return Promise.reject(e)
})

 
export default http