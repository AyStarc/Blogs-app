import React, { useContext, useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';
import Editor from '../Components/editor';
import { UserContext } from '../Context/usercontext';

export default function Editpostpage() {

  const { id } = useParams(); // post id
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');
  const [author, setAuthor] = useState('');

  // const { userInfo } = useContext(UserContext); 

  useEffect(
    () => {
      fetch(`http://localhost:4000/post/${id}`).then((response) => {
        response.json().then(
          (postinfo) => {
            setTitle(postinfo.title);
            setSummary(postinfo.summary);
            setContent(postinfo.content);
            setFiles(files?.[0])
            setAuthor(postinfo.author);
          }
        )
      })
    }, [])

  async function updatePost(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files?.[0]);
    data.set('author', author);

    const response = await fetch(`http://localhost:4000/post`, {
      method: 'PUT',
      body: data,
    })

    console.log("response =" + response);
    if (response.ok)
      setRedirect(true);
  }

  if (redirect)
    return <Navigate to={`/post/${id}`} />;

  return (
    <form onSubmit={updatePost}>
      <input type="text" placeholder='title' defaultValue={title}
        onChange={(e) => { setTitle(e.target.value) }} />
 
      <input type="text" placeholder='summary' defaultValue={summary}
        onChange={(e) => { setSummary(e.target.value) }} />

      <input type="file" defaultValue={files?.[0]} onChange={(e) => { setFiles(e.target.files) }} />

      <Editor value={content} onChange={setContent} />

      <button>Update Post</button>
    </form>
  )
}
