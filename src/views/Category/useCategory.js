import { getCategoryList } from '@/apis/category';
import {useRoute} from 'vue-router';
import { ref ,watchEffect} from 'vue';
export function useCategory() {
  const route = useRoute()
const categoryList = ref({})
const getcategory = async() =>{
  const res = await getCategoryList(route.params.id)
  categoryList.value = res.result
  
}
watchEffect (()=>getcategory())

return {
  categoryList
}
}