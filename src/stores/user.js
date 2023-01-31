import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import Repository from '../services/RepositoryFactory';

const auth = Repository.get('auth');


export const useUserStore = defineStore('user', () => {

  // DATA
  const user = ref({});

  // COMPUTED
  const getUser = computed(() => user.value)

  const userExist = computed(() => Object.keys(user.value).length > 0)

  // METHODS
  function authenticateUser(data) {
    const newUser = auth.authenticate(data)
    if (!newUser) {
      return false
    }
    user.value = newUser
    const r = {
      status: 200,
      message: `Welcome ${newUser.name}`
    }
    localStorage.setItem('user', JSON.stringify(newUser));
    return r;
  }

  function verifyUser() {
    const userLocal = JSON.parse(localStorage.getItem('user'));
    if (userLocal) {
      const exist = auth.userExists(userLocal.token);
      if (!exist) {
        localStorage.clear();
        return false;
      }
      if (exist && userExist) {
        user.value = userLocal
      }
      return true
    } else {
      return false;
    }
  }

  function logout() {
    user.value = Object.assign({}, user.value);
    localStorage.clear();
  }

  return { user, getUser, authenticateUser, userExist, logout, verifyUser }
})