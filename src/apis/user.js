import http from '@/utils/http'
export const getLikeListAPI = ({ limit = 4 } = {}) => {
  return http({
    url:'/goods/relevant',
    params: {
      limit 
    }
  })
}