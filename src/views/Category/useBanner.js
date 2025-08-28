import {ref,onMounted} from 'vue'
import { getBannerData } from '@/apis/home';
export function useBanner (){
  const bannerList = ref([])
const getBanner = async() =>{
  const res = await getBannerData({distributionSite: '2'})
  bannerList.value = res.result
}
onMounted(() => {
  getBanner()
})
return{ 
  bannerList
}
}