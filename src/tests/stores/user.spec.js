import { createPinia, setActivePinia } from "pinia";
import {useUserStore} from "@/stores/user";
import {beforeEach, test, describe, expect, it} from 'vitest'

class localStorage {
    constructor() {
      this.store = {};
    }
  
    clear() {
      this.store = {};
    }
  
    getItem(key) {
      return this.store[key] || null;
    }
  
    setItem(key, value) {
      this.store[key] = String(value);
    }
  
    removeItem(key) {
      delete this.store[key];
    }
  }
  
global.localStorage = new localStorage;

describe("User Store", () => {
  beforeEach(()=>{
    setActivePinia(createPinia())
  })

  test("the expected state", () => {
    const userStore = useUserStore();
    expect(userStore.user).toContain({});
  });
  
  test("expect to authenticate user", () => {
    const userStore = useUserStore();
    const r = {
        status: 200,
        message: 'Welcome Batman'
    }
    const loginData = {
        email: 'brunodiaz@gmail.com',
        password: 'Martha25*'
    }
    const response = userStore.authenticateUser(loginData)
    expect(response).toStrictEqual(r);
  });
  
  test("expect to fail authenticate", () => {
    const userStore = useUserStore();
    const r = false
    const loginData = {
        email: 'brunodiaz@hotmail.com',
        password: 'adada'
    }
    const response = userStore.authenticateUser(loginData)
    expect(response).toStrictEqual(false);
  });

  test("expect verify User return true", () => {
    const userStore = useUserStore();
    const jsonFoo = {
        email: "brunodiaz@gmail.com",
        name: "Batman",
        token: "erwsefsfsfssfesefsefsefefsefsdfsdfsdfa"
    }
    userStore.user.value = jsonFoo; 
    const response = userStore.verifyUser()
    expect(response).toStrictEqual(true);
  });

  test("expect empty the user state", () => {
    const userStore = useUserStore();
    userStore.logout();
    expect(userStore.user).toContain({});
  });
});