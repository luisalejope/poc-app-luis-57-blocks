<script setup>
import { onBeforeMount, ref } from 'vue';
import { storeToRefs } from 'pinia'
import { moviesStore } from '@/stores/movies';


const movies = moviesStore();

const { getAllMovies } = storeToRefs(movies);
const { requestMovies, requestMoviesByPage } = movies;

const numberPage = ref(0)

onBeforeMount(() => {
    requestMoviesByPage(1);
})

const handlePaginate = async () => {
    try {
        await requestMoviesByPage(numberPage.value + 2);
        numberPage.value += 1;
    } catch (error) {
        console.log(error)
    }
}
</script>

<template>
    <div>
        <div v-for=" movie of getAllMovies[numberPage]" :key="movie.id">
            {{ movie.title }}
        </div>
        <button @click="handlePaginate">
            next
        </button>
    </div>
</template>


<style scoped>

</style>