<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { moviesStore } from '@/stores/movies';
import List from '../components/global/List.vue';


const movies = moviesStore();

const { numberMovies, getAllMoviesByPage } = storeToRefs(movies);
const { requestMoviesByPage } = movies;

const numberPage = ref(1)

onBeforeMount(() => {
    requestMoviesByPage(numberPage.value);
})

const isVisibleNext = computed(()=> numberPage.value <  numberMovies.value / 20)
const isVisibleBack = computed(()=> numberPage.value >  1)

const handlePaginate = async (type) => {
    if(type === 'next') {
        try {
            await requestMoviesByPage(numberPage.value+1);
            numberPage.value += 1;
        } catch (error) {
            console.log(error)
        }
    } else {
        numberPage.value -= 1;
    }
}
</script>

<template>
    <div id="home-movies">
        <List :list="getAllMoviesByPage[numberPage-1] || []" :page="numberPage"/>
        <button @click="handlePaginate('back')" v-show="isVisibleBack">
            back
        </button>
        <button @click="handlePaginate('next')" v-show="isVisibleNext">
            next
        </button>
    </div>
</template>


<style scoped>
#home-movies{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>