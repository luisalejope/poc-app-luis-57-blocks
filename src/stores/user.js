import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { loaderStore } from '../stores/loader'
import Repository from '../repositories/RepositoryFactory';

const auth = Repository.get('auth');


export const userStore = defineStore('user', () => {
  // STORES
  const loadStore = loaderStore();

  const { handlerLoader } = loadStore;

  // DATA
  const user = ref({});

  // COMPUTED
  const getUser = computed(() => user.value)

  // METHODS
  function authenticateUser(data) {
    console.log(data)
    const newUser = auth.authenticate(data)
    if (!newUser) {
      return false
    }
    console.log(newUser, 'store')
    user.value = newUser
    const r = {
      status: 200,
      message: `Welcome ${newUser.name}`
    }
    localStorage.setItem('user', JSON.stringify(newUser));
    return r;
  }

  function userExist() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal) {
      const exist = auth.userExists(userLocal.token);
      if (!exist) {
        localStorage.clear();
        return false;
      }
      if (exist && Object.keys(user.value).length === 0) {
        user.value = userLocal;
      }
      return true
    } else {
      return false;
    }
  }

  return { user, getUser, authenticateUser, userExist }
})