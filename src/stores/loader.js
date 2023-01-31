import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoaderStore = defineStore('loader', () => {
  const loader = ref(false)
  const getLoaderStatus = computed(() => loader.value)

  function handlerLoader() {
    loader.value = !loader.value;
    
  }

  return { loader, getLoaderStatus, handlerLoader }
})