<script setup>
import { ref, computed } from 'vue';
const emit = defineEmits(['action'])

defineProps({
    text: {
        type: String,
        required: true
    },
    buttonType: {
        type: String,
        default: '' 
    },
    disabled: {
        type: Boolean,
        default: false,
    },
})

const handleClick = () => emit('action')

</script>
<template >
    <button id="button" :class="buttonType" :disabled="disabled" @click="handleClick">{{ text }}</button>
</template>
<style scoped>
#button {
  width: 100%;
  height: 2.5rem;
  border: none;
  cursor: pointer;
}

.primary {
    background-color: rgb(0, 75, 173);
    color: white;
    border-radius: 4px;
}
.primary:hover {
    background-color: rgb(0, 103, 238);
}

.link {
    background-color: white;
    color: rgb(0, 75, 173);
}
.link:hover {
    color: rgb(0, 103, 238);
    text-decoration: underline;
}

</style>