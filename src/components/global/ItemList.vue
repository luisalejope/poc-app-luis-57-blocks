
<script setup>
import { ref } from 'vue';
import IconHeart from '../icons/IconHeart.vue';
const emit = defineEmits(['action'])

const props = defineProps({
    id: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    favorite: {
        type: Boolean,
        required: true,
    }
})


const handleClick = () => {
    emit('action', props.id)
};
</script>

<template>
    <div id="item" class="mt-n mb-n">
        <h4>
            {{ title }}
        </h4>
        <i id="icon-heart" @click="handleClick">
            <IconHeart :filled="favorite" />
        </i>
    </div>
</template>

<style scoped>
#item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 8px;
    width: 100%;
    height: 50px;
    background-color: white;
    border: 1px solid #C5C5C5;
    border-radius: 3px;
    box-shadow: 1px 1px 3px 0px rgba(134, 134, 134, 0.21);
}
#icon-heart {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 23px;
  cursor: pointer;
  fill: rgb(159, 160, 160);
}
</style>