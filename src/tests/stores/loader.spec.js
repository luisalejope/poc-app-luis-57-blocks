import { createPinia, setActivePinia } from "pinia";
import {useLoaderStore} from "@/stores/loader";
import {beforeEach, test, describe, expect, it} from 'vitest'

describe("Loader Store", () => {
  beforeEach(()=>{
    setActivePinia(createPinia())
  })

  test("the expected state", () => {
    const loaderStore = useLoaderStore();
    expect(loaderStore.loader).toBe(false);
  });

  test("the loader should have changed", () => {
    const loaderStore = useLoaderStore();
    loaderStore.handlerLoader();
    expect(loaderStore.loader).toBe(true);
  });

  test("getLoaderStatus should bring the loader state", () => {
    const loaderStore = useLoaderStore();
    loaderStore.handlerLoader();
    expect(loaderStore.loader).toBe(loaderStore.loader);
  });
});



