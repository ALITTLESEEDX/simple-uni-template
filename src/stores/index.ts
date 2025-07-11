import { defineStore } from 'pinia'


export const useStore = defineStore('main', {
  state() {
    return {
      state: {}
    }
  },
  actions: {

  },
  unistorage: true,// 是否持久化
})
