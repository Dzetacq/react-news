import React, {useState} from 'react'
import {addArticle} from '../slices/articlesSlice'
import {useDispatch, useSelector} from 'react-redux'
import {selectNews} from '../slices/articlesSlice';
import '../styles/Forms.css'
import { Badge, Button, Form } from 'react-bootstrap';

function Add() {
    const [tags, setTags] = useState([])
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [content, setContent] = useState("");
    const [urlToImage, setImage] = useState("");
    const dispatch = useDispatch();
    const news = useSelector(selectNews);
    const id = news.length > 0 ? Math.max.apply(Math, news.map(a => Number(a.id))) + 1 : 1;
    const publishedAt = Date.now()
    const submitForm = e => {
        dispatch(addArticle({
            title, description, content, tags, id, publishedAt, urlToImage
        }))
    }
    const tagKeyDown = e => {
        if (e.keyCode === 13 || e.keyCode === 188) {
            let value = e.target.value.trim();
            e.preventDefault();
            if (!tags.includes(value) && value) {
                setTags([...tags, value]);
                e.target.value = "";
            }
        }
    }
    const deleteTag = e => {
        let target = e.currentTarget.dataset.value;
        let newTags = [...tags];
        newTags.splice(tags.indexOf(target), 1)
        setTags(newTags);
    }
    var badges = tags.map((t, i) => 
        <Badge data-value={t} key={i} pill bg="secondary" onClick={(e) => deleteTag(e)}>
            {t} <Badge pill bg="secondary">x</Badge>
        </Badge>
    )
    return (
        <Form onSubmit={(e) => submitForm(e)} action={'/details/' + (id - 1)}>
            <Form.Group controlId="title">
                <Form.Label>Article title:</Form.Label>
                <Form.Control placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="description">
                <Form.Label>Short description:</Form.Label>
                <Form.Control as="textarea" placeholder="Description" onChange={(e) => setDescription(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="content">
                <Form.Label>Full article content:</Form.Label>
                <Form.Control as="textarea" placeholder="Content" onChange={(e) => setContent(e.target.value)} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>URL to image:</Form.Label>
                <Form.Control placeholder="Optional" onChange={(e) => setImage(e.target.value)} />
            </Form.Group>
            <Form.Group controlId="tags">
                <Form.Label>Tags:</Form.Label>
                <div className='Tags'>{badges}</div>
                <Form.Control placeholder="Press enter or comma to add a tag" onKeyDown={(e) => tagKeyDown(e)} />
            </Form.Group><br/>
            <Button type="submit">Submit</Button>
        </Form>
            
    ) 
}

export default Add;