// 封装购物车模块

import { defineStore } from 'pinia'
import { ref,computed } from 'vue'
import {useUserStore} from './user'
import {addCartAPI,getinCartList,delCartAPI } from '@/apis/cart'


export const useCartStore = defineStore('cart', () => {
  const userStore = useUserStore()
  const islogin = computed(()=>userStore.userInfo.token)
  // 1. 定义state - cartList
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart =async (goods) => {
    const {skuId,count} = goods
    if(islogin.value){
    await addCartAPI({skuId,count})
    const res =await getinCartList()
    cartList.value = res.result
    
    }else{
 // 添加购物车操作
    // 已添加过 - count + 1
    // 没有添加过 - 直接push
    // 思路：通过匹配传递过来的商品对象中的skuId能不能在cartList中找到，找到了就是添加过
    const item = cartList.value.find((item) => goods.skuId === item.skuId)
    if (item) {
      // 找到了
      item.count++
    } else {
      // 没找到
      cartList.value.push(goods)
    }
    }
   
  }

  //清除购物车
  const clearCartList =()=>{
    cartList.value = []
  }
  // 删除购物车
  const delCart = async (skuId) => {
    if (islogin.value) {
      // 调用接口实现接口购物车中的删除功能
      await delCartAPI([skuId])
      const res = await getinCartList()
    cartList.value = res.result
    } else {
      // 思路：
      // 1. 找到要删除项的下标值 - splice
      // 2. 使用数组的过滤方法 - filter
      const idx = cartList.value.findIndex((item) => skuId === item.skuId)
      cartList.value.splice(idx, 1)
    }
  }
const updateNewList = async () => {
    const res = await getinCartList()
    cartList.value = res.result
}
  
  const allSelect = (select) =>{
    cartList.value.forEach(item=>item.selected = select)
  }
const toCheck = computed(()=>cartList.value.filter(item=>item.selected).reduce((pre,item)=>item.count+pre,0))
const toPrice = computed(()=>cartList.value.filter(item=>item.selected).reduce((pre,item)=>+item.price*item.count+pre,0))
const toCount = computed(()=>cartList.value.reduce((pre,item)=>item.count+pre,0))
const isAll = computed(()=>cartList.value.every((item)=>item.selected))
  return {
    cartList,
    addCart,
    delCart,
    allSelect,
    clearCartList,
    updateNewList,
    toCheck,
    toPrice,
    toCount,
    isAll
  }
}, {
  persist: true,
})