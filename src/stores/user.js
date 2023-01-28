import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import Repository from '../repositories/RepositoryFactory';

const auth = Repository.get('auth');


export const userStore = defineStore('user', () => {
  const user = ref({})
  const getUser = computed(() => user)

  async function authenticateUser(data) {
    try {
        console.log(data)
        const newUser = await auth.authenticate(data)
        if (!newUser) {
            return false
        }
        console.log(newUser, 'store')
        user.value = newUser
        const r =  {
            status: 200,
            message: `Welcome ${newUser.name}`
        }
        localStorage.setItem('user', JSON.stringify(newUser))
        return r
    } catch (error) {
        return error
    }
  }

  return { user, getUser, authenticateUser }
})