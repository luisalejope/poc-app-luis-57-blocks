import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Repository from '../repositories/RepositoryFactory';

const auth = Repository.get('api');


export const loaderStore = defineStore('loader', () => {
  const loader = ref(false)
  const getLoaderStatus = computed(() => loader.value)

  function handlerLoader() {
    console.log(loader.value)
    loader.value = !loader.value;
    
  }

  return { loader, getLoaderStatus, handlerLoader }
})