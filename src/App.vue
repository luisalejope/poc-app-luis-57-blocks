<script setup>
import { RouterView, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { loaderStore } from '@/stores/loader';
import { userStore } from '@/stores/user';
import Loader from '@/components/global/Loader.vue';
import Nav from '@/components/Nav.vue'
import { onBeforeMount, ref, computed } from 'vue';
// ROUTER
const router = useRouter();

// STORES
const loadStore = loaderStore();
const userstore = userStore();

const { getLoaderStatus } = storeToRefs(loadStore);
const { getUser } = storeToRefs(userstore)
const { userExist } = userstore;

// DATA
const authenticated = ref(true)

onBeforeMount(() => {
  authenticated.value = userExist()
  if (!authenticated.value && router.currentRoute.value.name !== 'login') {
    router.push('/login')
  }
})

</script>

<template>
  <div id="poc-container">
    <Nav v-show="Object.keys(getUser).length !== 0" />
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