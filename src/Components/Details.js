import React from 'react'
import { useSelector } from 'react-redux';
import { selectNews, deleteArticle } from '../slices/articlesSlice';
import { Link } from 'react-router-dom'
import {useDispatch} from 'react-redux'

function Details(props) {
    let article = useSelector(selectNews).find(x => x.id == props.match.params.id)
    const dispatch = useDispatch();
    
    if (!article) {
        return <p>Article does not exist</p>
    }
    var tags = []
    article.tags.forEach(e => {

        tags.push(<p key={e.id}>{e.title}</p>)
    });
    return (
        <div>
            <h2>{article.title}</h2>
            <Link to={"/edit/" + article.id} >
                <button type='button'>Edit</button>
            </Link>
            <Link to="/" >
                <button type='button' onClick={() => { dispatch(deleteArticle(article.id)) }}>Delete</button>
            </Link>
            <p>{article.subtitle}</p>
            <p>{ new Date(article.articleDates.publicationDate).toDateString() }</p>
            <p>{article.description} </p>
            <p>{article.content} </p>
            {tags}
        </div>
    );
}

export default Details;