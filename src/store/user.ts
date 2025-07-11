import { defineStore } from 'pinia'


export const useUserStore = defineStore('user', {
  state() {
    return {
      isLogin: false,
      state: {
      }
    }
  },
  actions: {

  },
  unistorage: true,// 是否持久化
})
