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
  const numberMovies = ref(0);
  const numberFavorites = ref(0);


  const getAllMoviesByPage = computed(() => {
    const moviesByPage = helperAssignPages(movies.value);
    return moviesByPage;
  });

  const getFavoritesByPage = computed(() => {
    const filteredMovies = movies.value.filter((movie) => movie.favorite === true && movie);
    numberFavorites.value = filteredMovies.length;
    const favoritesByPage = helperAssignPages(filteredMovies);
    return favoritesByPage;
  })


  async function requestMoviesByPage(page) {
    if (!(page - 1 >= 0 && page - 1 < getAllMoviesByPage.value.length)) {
      try {
        handlerLoader();
        const response = await apiRest.getMoviesByPage(page);
        console.log(response);
        const newPageMovies = response.data.map((movie) => {
          return { ...movie, favorite: false };
        })
        movies.value = [...movies.value, ...newPageMovies];
        numberMovies.value = Number(response.headers['x-total-count']);
      } catch (error) {
        console.error(error);
      } finally {
        handlerLoader()
      }
    }
  }

  function helperAssignPages(arr) {
    const maxItems = 20;
    const arrOfPages = [];

    for (let i = 0; i < arr.length; i += maxItems) {
      arrOfPages.push(arr.slice(i, i + maxItems));
    }
    return JSON.parse(JSON.stringify(arrOfPages))
  }

  function assignFavorite(data) {
    console.log(data)
    movies.value =  movies.value.map((movie) => {
      if (movie.id === data.id) {
        movie = data;
      }
      return movie;
    })
  }

  return { movies, numberMovies, numberFavorites, getAllMoviesByPage, getFavoritesByPage, requestMoviesByPage, assignFavorite }
})