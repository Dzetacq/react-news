import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { reloadArticles, selectNews } from '../slices/articlesSlice';
import { Link } from 'react-router-dom'

const Article = (props) => {
    var link = props.article.id ? "/details/" + props.article.id : "/";
    var title = props.article.title ? <h3>{props.article.title}</h3> : <h3>Title missing</h3>
    var description = props.article.description 
        ? <p> {props.article.description.length > 200 
            ? props.article.description.substring(0, 200) + "..." 
            : props.article.description } </p> 
        : <p>description missing</p>
    return (
        <article className="Article"  >
            <Link to={link} >
                {title}
                {description}
            </Link>
        </article>
    );
}
    

const NewsArray = (props) => {
    var page = props.page ? Number(props.page) : 1
    var newsData = useSelector(selectNews);
    var sortedData = newsData.slice(0).sort((a, b) => new Date(b.publishedAt) - 
                            new Date(a.publishedAt))
    var output = []
    
    for (var i = 0 + (page - 1) * 10; i < sortedData.length && i < page * 10; i++) {
        output.push(
            <Article key={i} article={sortedData[i]} />
        )
    }
    if (output.length < 1) {
        output.push(
            <div key={1}>
                <p>There's no news on this page</p>
            </div>
        )
    }
    output.push(<Buttons key={-1} page={page} length={sortedData.length}/>)
    return output;
} 

function News(props) {
    return (
        <NewsArray page={props.match.params.page} />
    );
}

const Buttons = (props) => {
    const dispatch = useDispatch();
    let previous = props.page < 2 ? "" : <Link to={"/news/" + (props.page - 1)}>{"< Previous"}</Link>
    let next = props.length <= props.page * 10 ? "" : <Link to={"/news/" + (props.page + 1)}>{"Next >"}</Link>
    return (
        <div>
            {previous}
            <Link to="/"><button type='button' onClick={() => {dispatch(reloadArticles())}} >Load new news </button> </Link>
            {next}
        </div>
    );
}

export default News;
