<script setup>
import { RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { useLoaderStore } from '@/stores/loader';
import { useUserStore } from '@/stores/user';
import Loader from '@/components/global/Loader.vue';
import Nav from '@/components/Nav.vue'
import { onBeforeMount, ref, computed } from 'vue';
// ROUTER
const router = useRouter();

// STORES
const loadStore = useLoaderStore();
const userStore = useUserStore();

const { getLoaderStatus } = storeToRefs(loadStore);
const { getUser, userExist, } = storeToRefs(userStore)
const {verifyUser} = userStore


// DATA
const authenticated = ref(true)

onBeforeMount(() => {
  authenticated.value = userExist.value

  if (!userExist.value) {
     verifyUser()
  }
})
</script>

<template>
  <div id="poc-container" class="mb-xl">
    <Nav />
    <RouterView />
    <Loader v-show="getLoaderStatus" />
  </div>
</template>

<style scoped>
#poc-container {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>

<!--  -->