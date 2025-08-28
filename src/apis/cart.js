import http from '@/utils/http'

export const addCartAPI = ({skuId,count}) =>{
  return http.post('/member/cart',{
    skuId,
    count
  })
}

export const getinCartList = () =>{
  return http.get('/member/cart')
}

// 删除购物车
export const delCartAPI = (ids) => {
  return http({
    url: '/member/cart',
    method: 'DELETE',
    data: {
      ids
    }
  })
}

export const mergeCartAPI = (data) =>{
  return http.post('/member/cart/merge',data)
}