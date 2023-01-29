import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Repository from '../repositories/RepositoryFactory';

const apiRest = Repository.get('api');


export const moviesStore = defineStore('movies', () => {
  const movies = ref([]);
  const getAllMovies = computed(() => movies.value);

 async function requestMovies() {
    try {
        const response = await apiRest.getStateAccounts()
        console.log(response);
        movies.value = response.data;
    } catch (error) {
        console.error(error)
    }
  }

  return { movies, getAllMovies, requestMovies }
})