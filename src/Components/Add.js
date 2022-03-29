import React, {useState} from 'react'
import {WithContext as ReactTags} from 'react-tag-input';
import {addArticle} from '../slices/articlesSlice'
import {useDispatch, useSelector} from 'react-redux'
import {selectNews} from '../slices/articlesSlice';
import Input from './Input'

function Add() {
    const [tags, setTags] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const news = useSelector(selectNews);
    const id = news.length > 0 ? Math.max.apply(Math, news.map(a => Number(a.id))) + 1 : 1;
    const publishedAt = Date.now()
    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAddition = tag => {
        setTags([...tags, tag]);
    };
    return (
        <form action={'/details/' + (id - 1)}>
            <Input name="title" description="Title" 
                    onChange={(e) => setTitle(e.target.value)}/>
            <Input name="description" description="Description" area={true} 
                    onChange={(e) => setDescription(e.target.value)} />
            <Input name="content" description="Content" area={true} 
                    onChange={(e) => setContent(e.target.value)} />
            <ReactTags 
                    tags={tags}
                    handleDelete={handleDelete} 
                    handleAddition={handleAddition}
            />
            <input type="submit" value="submit" 
                    onClick={() => {dispatch(addArticle({
                        title, description, content, tags, id, publishedAt
                    }))}}/>
        </form>
    ) 
}

export default Add;