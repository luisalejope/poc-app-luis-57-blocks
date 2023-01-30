<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { moviesStore } from '@/stores/movies';
import List from '../components/global/List.vue';


const movies = moviesStore();

const { numberFavorites, getFavoritesByPage } = storeToRefs(movies);

const numberPage = ref(1)


const isVisibleNext = computed(() => numberPage.value < numberFavorites.value / 20)
const isVisibleBack = computed(() => numberPage.value > 1)

const handlePaginate = async (type) => {
    if (type === 'next') {
        numberPage.value += 1;
    } else {
        numberPage.value -= 1;
    }
}
</script>

<template>
    <div id="home-movies">
        <List :list="getFavoritesByPage[numberPage - 1] || []" :page="numberPage" />
        <button @click="handlePaginate('back')" v-show="isVisibleBack">
            back
        </button>
        <button @click="handlePaginate('next')" v-show="isVisibleNext">
            next
        </button>
    </div>
</template>


<style scoped>
#home-movies {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>