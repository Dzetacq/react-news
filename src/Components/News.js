import React from 'react';
import { useSelector } from 'react-redux';
import { selectNews } from '../slices/articlesSlice';
import { Link } from 'react-router-dom'

const Article = (props) => {
    return (
        <article className="Article"  >
            <Link to={"/news/" + props.article.id} >
                <h3> {props.article.title} </h3>
                <h4> {props.article.subtitle} </h4>
                <p> {props.article.description.substring(0, 200) } </p> 
            </Link>
        </article>
    ); //round substring nicely
}
    

const NewsArray = () => {
    var newsData = useSelector(selectNews);
    var sortedData = newsData.slice(0).sort((a, b) => new Date(b.articleDates.publicationDate) - 
                            new Date(a.articleDates.publicationDate))
    var output = []
    
    for (var i = 0; i < sortedData.length && i < 10; i++) {
        output.push(
            <Article key={i} article={sortedData[i]} />
        )
    }
    return output;
} 

function News() {
  return (
    <NewsArray />
  );
}

export default News;
