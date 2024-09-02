import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timerStore', {
  state: () => ({
    timer: 0
  }),
  actions: {
    setTimer(timer) {
      this.timer = timer
    }
  },
  persist: {
    enabled: true
  }
})
