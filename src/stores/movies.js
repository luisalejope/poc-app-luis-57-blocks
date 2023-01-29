import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { loaderStore } from './loader';
import Repository from '../repositories/RepositoryFactory';

const apiRest = Repository.get('api');


export const moviesStore = defineStore('movies', () => {

  // STORES
  const loadStore = loaderStore();
  const { handlerLoader } = loadStore;

  // DATA
  const movies = ref([]);


  const getAllMovies = computed(() => movies.value);

  async function requestMovies() {
      try {
          handlerLoader()
          const response = await apiRest.getAllMovies()
          console.log(response);
          movies.value = response.data;
      } catch (error) {
          console.error(error)
      } finally{
        handlerLoader()
      }
  }

  async function requestMoviesByPage(page) {
    try {
        handlerLoader()
        const response = await apiRest.getMoviesByPage(page);
        console.log(response);
        movies.value = [...movies.value, response.data];
    } catch (error) {
        console.error(error)
    } finally{
      handlerLoader()
    }
  }

  return { movies, getAllMovies, requestMovies, requestMoviesByPage }
})