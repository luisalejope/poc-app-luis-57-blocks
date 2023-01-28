<script setup>
import { onBeforeMount } from 'vue';
import { storeToRefs } from 'pinia'
import { moviesStore } from '@/stores/movies';


const movies = moviesStore();

const { getAllMovies } = storeToRefs(movies);
const { requestMovies } = movies;

    onBeforeMount(() => {
        requestMovies();
    })
</script>

<template>
    <div v-for=" movie of getAllMovies" :key="movie.id">
        {{ movie.title }}
    </div>
</template>


<style scoped>

</style>