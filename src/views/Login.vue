<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import {useRouter} from 'vue-router';

import { userStore } from '../stores/user'
import IconEyeOpen from '../components/icons/IconEyeOpen.vue';
import IconEyeClosed from '../components/icons/IconEyeClosed.vue';
import Button from '../components/global/Button.vue';

// ROUTER
const router = useRouter();

// STORES
const store = userStore();

const { user, getUser } = storeToRefs(store)
const { authenticateUser } = store

// DATA
const email = ref('');
const password = ref('');
const showPassword = ref(false);

// COMPUTED
const emailSyntaxis = computed(()=>{
  const regexp = /\S+@\S+\.\S+/;
  return regexp.test(String(email.value).toLowerCase());
})

const formCompleted = computed(()=> {
  const isCompleted = email.value.length > 0 && password.value.length > 0;
  console.log(isCompleted && emailSyntaxis.value)
  return isCompleted && emailSyntaxis.value;
})

// METHODS:
const handleShowPass = () => showPassword.value = !showPassword.value;

const handleSubmit = () => { 
    const loginData = {
      email: email.value,
      password: password.value
    }
    const response = authenticateUser(loginData);
    console.log(response, 'login');
    if (!response) {
      console.log(response, 'error');
    } else {
      router.push('/home')
    }
}
</script>

<template>
  <div id="login">
    <div class="login-form">
      <label class="mb-s" for="email">Email</label>
      <div class="input-container">
        <input name="email" type="email" v-model="email" placeholder="example@mail.com">
      </div>
      <label class="mt-n mb-s" for="password">Password</label>
      <div class="input-container">
        <input name="password" :type="showPassword ? 'text' : 'password'" v-model="password">
        <i id="icon-eye" @click="handleShowPass">
          <IconEyeOpen v-show="showPassword"/>
          <IconEyeClosed v-show="!showPassword"/>
        </i>
      </div>
      <div class="login-button-flex mt-n">
        <div id="forgot-button-container" >
          <Button button-type="link" text="Forgot password" />
        </div>
        <div id="login-button-container" >
          <Button button-type="primary" text="LOGIN" :disabled="!formCompleted" @action="handleSubmit"/>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#login {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.login-form {
  display: flex;
  width: 40%;
  flex-direction: column;
}

.login-button-flex {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.input-container {
  display: flex;
  width: 100%;
  height:50px;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #D6D6D6;
  align-items: center;
}


#login-button-container{
  width: 7rem;
}

#forgot-button-container{
  width: 7rem;
}

#icon-eye {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 23px;
  cursor: pointer;
  fill: rgb(159, 160, 160);
}

#icon-eye:hover{
  fill: rgb(112, 112, 112);
}

@media (max-width: 600px) {
  #login {
    justify-content: flex-start;
    margin-top: 2rem;
  }
  #login-button-container{
    width: 100%;
  }
  .login-form {
    width: 90%;
  }
  .login-button-flex{
    flex-direction: column-reverse;
    justify-content: center;
    align-items: center;
  }
}
</style>

