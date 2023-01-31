<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { moviesStore } from '@/stores/movies';
import List from '../components/global/List.vue';
import Button from '../components/global/Button.vue';


const movies = moviesStore();

const { numberMovies, getAllMoviesByPage } = storeToRefs(movies);
const { requestMoviesByPage } = movies;

const numberPage = ref(1)

onBeforeMount(() => {
    requestMoviesByPage(numberPage.value);
})

const isVisibleNext = computed(() => numberPage.value < numberMovies.value / 20)
const isVisibleBack = computed(() => numberPage.value > 1)

const handlePaginate = async (type) => {
    if (type === 'next') {
        try {
            await requestMoviesByPage(numberPage.value + 1);
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
        <div class="container-buttons mt-l">
            <div>
                <Button button-type="secondary font-size-bg" text="&#9754;" @action="handlePaginate('back')"
                    v-show="isVisibleBack" />
            </div>
            <h2 class="principal-title">
                Movies
            </h2>
            <div>
                <Button button-type="secondary font-size-bg " text="&#9755;" @action="handlePaginate('next')"
                    v-show="isVisibleNext" />
            </div>
        </div>
        <List :list="getAllMoviesByPage[numberPage - 1] || []" :page="numberPage" />
        <div class="container-buttons">
            <div>
                <Button button-type="secondary font-size-bg" text="&#9754;" @action="handlePaginate('back')"
                    v-show="isVisibleBack" />
            </div>
            <div />
            <div>
                <Button button-type="secondary font-size-bg" text="&#9755;" @action="handlePaginate('next')"
                    v-show="isVisibleNext" />
            </div>
        </div>
    </div>
</template>


<style scoped>
#home-movies {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    -webkit-animation: bounce-in 1s ease 0s 1 normal;
    -moz-animation: bounce-in 1s ease 0s 1 normal;
    -ms-animation: bounce-in 1s ease 0s 1 normal;
    animation: bounce-in 1s ease 0s 1 normal;
}

.container-buttons {
    display: grid;
    width: 50%;
    grid-template-columns: 40px auto 40px;
}

.principal-title {
    text-align: center;
}


@media (max-width: 600px) {
    .container-buttons {
        width: 90%;
    }
}
</style>