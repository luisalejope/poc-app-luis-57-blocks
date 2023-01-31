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
const { getUser, userExist, } = storeToRefs(userstore)
const {verifyUser} = userstore


// DATA
const authenticated = ref(true)

onBeforeMount(() => {
  authenticated.value = userExist.value
  console.log('onbefore', userExist.value)
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