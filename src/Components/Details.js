import React from 'react'
import { useSelector } from 'react-redux';
import { selectNews, deleteArticle } from '../slices/articlesSlice';
import { Link, useParams } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import '../styles/Details.css'
import { Badge, Button, ButtonGroup, Figure } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function Details(props) {
    let params = useParams();
    let newsData = useSelector(selectNews)
    var sortedData = [...newsData].sort((a, b) => new Date(b.publishedAt) - 
                            new Date(a.publishedAt))
    let index = sortedData.findIndex(x => x.id == params.id);
    let article = sortedData[index]
    const dispatch = useDispatch();
    
    if (!article) {
        return <p>Article does not exist</p>
    }
    var tags = []
    article.tags.forEach(t => {
        tags.push(<Badge pill key={t}>{t}</Badge>)
    });
    let image = article.urlToImage ? <img src={article.urlToImage} alt=""></img> : ''
    let returner = Math.ceil((index+1)/10)
    let redirect = !article.source ? "" : 
        <a href={article.url}>Read full article on {article.source.name}</a>
    return (
        <article className='article'>
            {image}
            <h2>{article.title}</h2>
            <Figure.Caption>{ new Date(article.publishedAt).toDateString() }</Figure.Caption>
            <ButtonGroup>
                <LinkContainer to={"/edit/" + article.id} >
                    <Button>Edit</Button>
                </LinkContainer>
                <LinkContainer to="/" >
                     <Button variant="danger" onClick={() => { dispatch(deleteArticle(article.id)) }}>Delete</Button>
                </LinkContainer>
            </ButtonGroup>
            <p>{article.content} </p>
            {redirect}
            <div className='tags'>
                {tags}
            </div>
            <Link to={"/news/" + returner} >Back</Link>
        </article>
    );
}

export default Details;