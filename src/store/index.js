import Vue from 'vue'
import Vuex from 'vuex'
import {getItem,setItem} from '@/utils/storage'
Vue.use(Vuex)
const touTiao_Key ='TOUTIAO_USER'
export default new Vuex.Store({
  state: {
    user:getItem(touTiao_Key)
    
  },
  getters: {
  },
  mutations: {
    updateUser(state,payload){
      state.user=payload
      setItem(touTiao_Key,payload)
      // window.localStorage.setItem(touTiao_Key,JSON.stringify(payload))
    }
  },
  actions: {
  },
  modules: {
  }
})
