import http from '@/utils/http'

export const getBannerData = (params={}) =>{
  const { distributionSite = '1' } = params
  return http.get('/home/banner',{
    params:{
      distributionSite
    }
  })
}

export const getNewthing = () =>{
  return http.get('/home/new')
}

export const getHotAPI = () => {
  return  http.get('home/hot', 'get', {})
}

export const getGoodsAPI = () => {
  return http.get('/home/goods')
}