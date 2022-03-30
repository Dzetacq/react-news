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
    var sortedData = [...newsData].sort((a, b) => new Date(b.published_date) - 
                            new Date(a.published_date))
    let index = sortedData.findIndex(x => x.id === Number(params.id));
    let article = sortedData[index]
    const dispatch = useDispatch();
    
    if (!article) {
        return <p>Article does not exist</p>
    }
    var tags = []
    article.tags.forEach(t => {
        tags.push(<Badge pill key={t}>{t}</Badge>)
    });
    let image = article.media ? <img src={article.media} alt=""></img> : ''
    let returner = Math.ceil((index+1)/10)
    let redirect = !article.link ? "" : 
        <a href={article.link}>Read full article on {article.rights}</a>
    return (
        <article className='article'>
            {image}
            <h2>{article.title}</h2>
            <Figure.Caption>{ new Date(article.published_date).toDateString() }</Figure.Caption>
            <ButtonGroup>
                <LinkContainer to={"/ebert/edit/" + article.id} >
                    <Button>Edit</Button>
                </LinkContainer>
                <LinkContainer to="/ebert/" >
                     <Button variant="danger" onClick={() => { dispatch(deleteArticle(article.id)) }}>Delete</Button>
                </LinkContainer>
            </ButtonGroup>
            <p>{article.summary} </p>
            {redirect}
            <div className='tags'>
                {tags}
            </div>
            <Link to={"/ebert/news/" + returner} >Back</Link>
        </article>
    );
}

export default Details;