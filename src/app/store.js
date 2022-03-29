import { configureStore } from '@reduxjs/toolkit';
import articlesReducer from '../slices/articlesSlice';

function save(state) {
  //console.log("saving")
  try {
    const serialised = JSON.stringify(state);
    localStorage.setItem("state", serialised);
  } catch (e) {
    console.warn(e);
  }
}

function load() {
  //console.log("loading")
  try {
    const serialised = localStorage.getItem("state");
    return serialised === null ? undefined : JSON.parse(serialised);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}


export const store = configureStore({
  reducer: {
    articles: articlesReducer
  },
  preloadedState: load()
});

store.subscribe(() => save(store.getState()));

export default store;