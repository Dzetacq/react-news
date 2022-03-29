import React, {useState} from 'react'
import {WithContext as ReactTags} from 'react-tag-input';
import {addArticle} from '../slices/articlesSlice'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux';
import {selectNews} from '../slices/articlesSlice';
import Input from './Input'

function Add() {
    const [tags, setTags] = useState([])
    const [title, setTitle] = useState("");
    const [subtitle, setSubtitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const dispatch = useDispatch();
    const id = Math.max.apply(Math, useSelector(selectNews).map(a => Number(a.id))) + 1;
    const articleDates = {"publicationDate": Date.now(), "updateDate": Date.now()}
    const handleDelete = i => {
        setTags(tags.filter((tag, index) => index !== i));
    };
    const handleAddition = tag => {
        setTags([...tags, tag]);
    };
    return (
        <form action={'/news/' + (id - 1)}>
            <Input name="title" description="Title" 
                    onChange={(e) => setTitle(e.target.value)}/>
            <Input name="subtitle" description="Subtitle" 
                    onChange={(e) => setSubtitle(e.target.value)}/>
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
                        title, subtitle, description, content, tags, id, articleDates
                    }))}}/>
        </form>
    ) 
}

export default Add;