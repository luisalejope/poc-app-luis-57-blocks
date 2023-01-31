<script setup>
import { computed } from 'vue';
import { useRouter } from 'vue-router'
import ItemList from './ItemList.vue';
import { useMovieStore } from '@/stores/movies';

const router = useRouter();

const movies = useMovieStore();

const { assignFavorite } = movies;

const props = defineProps({
    list: {
        type: Array,
        required: true,
    },
    page: {
        type: Number,
        required: true,
    },
})



const handleSetFavorites = (id) => {
    const filtered = props.list.filter((m) => m.id === id)
    const movie = Object.assign({}, filtered[0]);
    movie.favorite = !movie.favorite;
    assignFavorite(movie)
}

const goDetail = (id) => {
    router.push(`/detail/${id}`)
}
</script>


<template>
    <div class="list-container">
        <ItemList v-for=" item of list" :key="item.id" :title="item.title" :favorite="item.favorite" :id="item.id"
            @action="handleSetFavorites" @goDetail="goDetail(item.id)"/>
    </div>
</template>

<style scoped>
.list-container {
    width: 50%;
}

@media (max-width: 600px) {
    .list-container {
        width: 90%;
    }
}
</style>