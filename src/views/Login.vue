<script setup>
import { ref, computed } from 'vue';
import { storeToRefs } from 'pinia'
import {useRouter} from 'vue-router';

import { useUserStore } from '../stores/user'
import IconEyeOpen from '../components/icons/IconEyeOpen.vue';
import IconEyeClosed from '../components/icons/IconEyeClosed.vue';
import Button from '../components/global/Button.vue';
import Modal from '../components/global/Modal.vue';

// ROUTER
const router = useRouter();

// STORES
const store = useUserStore();

const { user, getUser } = storeToRefs(store)
const { authenticateUser } = store

// DATA
const email = ref('');
const password = ref('');
const showPassword = ref(false);
const errorSubmit = ref(false);
const forgotModal = ref(false);

// COMPUTED
const emailSyntaxis = computed(()=>{
  const regexp = /\S+@\S+\.\S+/;
  return regexp.test(String(email.value).toLowerCase());
})

const formCompleted = computed(()=> {
  const isCompleted = email.value.length > 0 && password.value.length > 0;
  return isCompleted && emailSyntaxis.value;
})

// METHODS:
const handleShowPass = () => showPassword.value = !showPassword.value;

const handleSubmit = () => { 
    errorSubmit.value = false
    const loginData = {
      email: email.value,
      password: password.value
    }
    const response = authenticateUser(loginData);
    if (!response) {
      errorSubmit.value = true; 
    } else {
      errorSubmit.value = false
      router.push('/home')
    }
}

const handleForgot = () => {
  forgotModal.value = !forgotModal.value
}
</script>

<template>
  <div id="login">
    <p class="error-message" v-show="errorSubmit">The email or the passwrord are incorrect</p>
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
          <Button button-type="link" text="Forgot password" @action="handleForgot"/>
        </div>
        <div id="login-button-container" >
          <Button button-type="primary" text="LOGIN" :disabled="!formCompleted" @action="handleSubmit"/>
        </div>
      </div>
    </div>
    <Modal v-show="forgotModal">
      <template #content>
        <div class="card-forgot">
          <div class="close-forgot">
            <div class="close-container">
              <Button button-type="link" text="X" @action="handleForgot"/>
            </div>
          </div>
          <p>&#9888;</p>
          If you dont know your credentials, please go to the repository README.md
        </div>
      </template>
    </Modal>
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
.close-container{
  width: 20px;
}
.card-forgot {
  display: flex;
  flex-direction: column;

  width: 60%;
  height: 190px;
  background-color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
}
.close-forgot {
  width: 100%;
  display: flex;
  justify-content: flex-end;
}
.card-forgot > p {
  text-align: center;
  color: rgb(228, 130, 2);
  font-size: 30px;
}

.error-message {
  color: red;
  font-size: 1.2rem;
  font-weight: bold;
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

