import React, {useState} from 'react'
import {editArticle} from '../slices/articlesSlice'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux';
import {selectNews} from '../slices/articlesSlice';
import { useParams } from 'react-router-dom';
import { Badge, Button, Form } from 'react-bootstrap';

function Edit(props) {
    const params = useParams();
    const article = useSelector(selectNews).find(x => x.id === Number(params.id))
    const [tags, setTags] = useState(article.tags)
    const [title, setTitle] = useState(article.title);
    const [excerpt, setExcerpt] = useState(article.excerpt);
    const [media, setImage] = useState(article.media);
    const [summary, setSummary] = useState(article.summary);
    const dispatch = useDispatch();
    const id = article.id;
    const published_date = article.published_date
    const submitForm = e => {
        dispatch(editArticle({
            title, excerpt, summary, tags, id, published_date, media
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
        <Form onSubmit={(e) => submitForm(e)} action={'/details/' + id}>
            <Form.Group controlId="title">
                <Form.Label>Article title:</Form.Label>
                <Form.Control value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="excerpt">
                <Form.Label>Short description:</Form.Label>
                <Form.Control value={excerpt} as="textarea" placeholder="excerpt" onChange={(e) => setExcerpt(e.target.value)} required />
            </Form.Group>
            <Form.Group controlId="summary">
                <Form.Label>Full article content:</Form.Label>
                <Form.Control value={summary} as="textarea" onChange={(e) => setSummary(e.target.value)} required />
            </Form.Group>
            <Form.Group>
                <Form.Label>URL to image:</Form.Label>
                <Form.Control value={media} placeholder="Optional" onChange={(e) => setImage(e.target.value)} />
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

export default Edit;