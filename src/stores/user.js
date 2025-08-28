import { defineStore } from "pinia";
import {ref} from "vue"
import { Login} from '@/apis/login'
import { useCartStore } from "./cart";
import { mergeCartAPI} from "@/apis/cart"

export const useUserStore= defineStore("user",() => {
    const cartStore = useCartStore()
    const userInfo = ref({})
    // 获取用户信息
    const getUserInfo = async (data) => {
        const res = await  Login(data.account, data.password)
        console.log(res);
        userInfo.value = res.result

        await   mergeCartAPI(cartStore.cartList.map(item =>{
        return {
            skuId: item.skuId,
            selected:item.selected,
            count:item.count
        }
    }))
    cartStore.updateNewList()
    }
    // 合并购物车

    // 清除用户信息
    const reomveUserInfo = () => {
        userInfo.value = {}
        cartStore.clearCartList()
    }

    return {
        userInfo,
        getUserInfo,
        reomveUserInfo
    }
    
}, {
  persist: true,
})