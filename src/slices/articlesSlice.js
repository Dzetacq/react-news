import { createSlice } from "@reduxjs/toolkit";
import NewsApi from '../api/newsApi'

export const articlesSlice = createSlice({
    name: 'articles',
    initialState: {
        value: []
    },
    reducers: {
        addArticle: (state, action) => {
            state.value.push(action.payload)
        }, 
        editArticle: (state, action) => {
            state.value[state.value.findIndex(o => o.id === action.payload.id)] = action.payload;
        },
        deleteArticle: (state, action) => {
            state.value.splice(state.value.findIndex(o => o.id === action.payload), 1);
        },
        reloadArticlesInternal: (state, action) => {
            state.value = (action.payload);
        }
    }
})

const articleNormaliser = (articles) =>{
    var id = 1
    var newArticles = []
    articles.forEach(a => {
        let article = a
        article.tags = []
        article.id = id++
        newArticles.push(article)
    })
    return newArticles
}

export const { addArticle, editArticle, deleteArticle, reloadArticlesInternal } = articlesSlice.actions

export const reloadArticles = () => (dispatch) => {
    var api = new NewsApi()
    var promise = api.getNews();
    promise.then(function(r) {
            dispatch(reloadArticlesInternal(articleNormaliser(r.data.articles)))
        }, function() {console.log('api error')}
    );
}

export const selectNews = (state) => state.articles.value

export default articlesSlice.reducer