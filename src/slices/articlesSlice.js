import { createSlice } from "@reduxjs/toolkit";
import newsData from '../loadedDefault';

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        value: newsData
    },
    reducers: {
        addArticle: (state, action) => {
            action.payload.tags = tagNormaliser(action.payload.tags);
            state.value.push(action.payload)
        }, 
        editArticle: (state, action) => {
            action.payload.tags = tagNormaliser(action.payload.tags)
            state.value[state.value.findIndex(o => o.id == action.payload.id)] = action.payload;
        },
        deleteArticle: (state, action) => {
            state.value.splice(state.value.findIndex(o => o.id == action.payload), 1);
        }
    }
})

const tagNormaliser = (tags) => {
    let newTags = tags;
    newTags.forEach(t => {
        t.title = t.text;
    });
    return newTags;
}

export const { addArticle, editArticle, deleteArticle } = articlesSlice.actions

export const selectNews = (state) => state.articles.value

export default articlesSlice.reducer