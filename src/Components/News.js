import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { reloadArticles, selectNews } from '../slices/articlesSlice';
import { Link, useParams } from 'react-router-dom'
import Card from 'react-bootstrap/Card'
import { Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Article = (props) => {
    var link = props.article.id ? "/details/" + props.article.id : "/";
    var title = props.article.title ? props.article.title : "Title missing"
    var description = props.article.description 
        ? props.article.description.length > 200 
            ? props.article.description.substring(0, 200) + "..." 
            : props.article.description 
        : "description missing"
    return (
        <article className="Card"  >
            <div className='shadow'>
                <Link to={link} >
                    <Card bg="light" >
                        <Card.Img src={props.article.urlToImage} />
                        <Card.Body>
                            <Card.Title>{title}</Card.Title>
                            <Card.Text>{description}</Card.Text>
                        </Card.Body>
                    </Card>
                </Link>
            </div>
        </article>
    );
}
    

const NewsArray = (props) => {
    var output = []
    
    for (var i = 0 + (props.page - 1) * 10; i < props.data.length && i < props.page * 10; i++) {
        output.push(
            <Article key={i} article={props.data[i]} />
        )
    }
    if (output.length < 1) {
        output.push(
            <div key={1}>
                <p>There's no news on this page</p>
            </div>
        )
    }
    return output;
} 

function News(props) {
    var params = useParams();
    var newsData = useSelector(selectNews);
    var sortedData = [...newsData].sort((a, b) => new Date(b.publishedAt) - 
                            new Date(a.publishedAt))
    var page = params.page ? Number(params.page) : 1
    return (
        <div>
            <div className='Wrapper'>
                <NewsArray page={page} data={sortedData} />
            </div>
            <Buttons key={-1} page={page} length={sortedData.length}/>
        </div>
    );
}

const Buttons = (props) => {
    const dispatch = useDispatch();
    return (
        <div className="Buttons">
            <LinkContainer to={"/news/" + (props.page - 1)}>
                <Button disabled={props.page < 2} size="lg" >
                    {"< Previous"}
                </Button>
            </LinkContainer>
            <LinkContainer to="/" >
                <Button onClick={() => {dispatch(reloadArticles())}} size="lg" variant="warning" >
                    Load new news
                </Button>
            </LinkContainer>
            <LinkContainer to={"/news/" + (props.page + 1)}>
                <Button disabled={props.length <= props.page * 10} size="lg" >
                    {"Next >"}
                </Button>
            </LinkContainer>
        </div>
    );
}

export default News;
