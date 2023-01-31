<script setup>
import { onBeforeMount, ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import { moviesStore } from '@/stores/movies';
import List from '../components/global/List.vue';
import Button from '../components/global/Button.vue';


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
        <div class="container-buttons mt-l">
            <div>
                <Button button-type="secondary font-size-bg" text="&#9754;" @action="handlePaginate('back')"
                    v-show="isVisibleBack" />
            </div>
            <h2 class="principal-title">
                Favorite Movies
            </h2>
            <div>
                <Button button-type="secondary font-size-bg " text="&#9755;" @action="handlePaginate('next')"
                    v-show="isVisibleNext" />
            </div>
        </div>
        <List :list="getFavoritesByPage[numberPage - 1] || []" :page="numberPage" />
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