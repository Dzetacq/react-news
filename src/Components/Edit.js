import React, {useState} from 'react'
import Input from './Input'
import {WithContext as ReactTags } from 'react-tag-input';
import {editArticle} from '../slices/articlesSlice'
import {useDispatch} from 'react-redux'
import {useSelector} from 'react-redux';
import {selectNews} from '../slices/articlesSlice';

function Edit(props) {
  const article = useSelector(selectNews).find(x => x.id == props.match.params.id)
  let correctTags = [];
  article.tags.forEach(t => {
    let newTag = {text: t.title, title: t.title, id: t.title}
    correctTags.push(newTag);
  });
  const [tags, setTags] = useState(correctTags)
  const [title, setTitle] = useState(article.title);
  const [subtitle, setSubtitle] = useState(article.subtitle);
  const [description, setDescription] = useState(article.description);
  const [content, setContent] = useState(article.content);
  const dispatch = useDispatch();
  const id = article.id;
  const articleDates = {
            "publicationDate": article.articleDates.publicationDate, 
            "updateDate": Date.now()}
  const handleDelete = i => {
      setTags(tags.filter((tag, index) => index !== i));
  };
  const handleAddition = tag => {
      setTags([...tags, tag]);
  };
  return (
      <form action={'/news/' + id}>
          <Input name="title" description="Title" value={title}
                  onChange={(e) => setTitle(e.target.value)}/>
          <Input name="subtitle" description="Subtitle"  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}/>
          <Input name="description" description="Description" area={true}  value={description}
                  onChange={(e) => setDescription(e.target.value)} />
          <Input name="content" description="Content" area={true}  value={content}
                  onChange={(e) => setContent(e.target.value)} />
          <ReactTags 
                  tags={tags}
                  handleDelete={handleDelete} 
                  handleAddition={handleAddition}
          />
          <input type="submit" value="submit" 
                  onClick={() => {dispatch(editArticle({
                      title, subtitle, description, content, tags, id, articleDates
                  }))}}/>
      </form>
  ) 
}

export default Edit;