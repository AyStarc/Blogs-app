import React, { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom';

export default function editpostpage() {

  const { id } = useParams(); // post id
  const [redirect, setRedirect] = useState(false);
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFiles] = useState('');

  useEffect(
    () => {
      fetch(`http://localhost:4000/post/${id}`).then((response) => {
        response.json().then(
          (postinfo) => {
            setTitle(postinfo.title);
            setSummary(postinfo.summary);
            setContent(postinfo.content);
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

    const response = await fetch('http://localhost:4000/post', {
      method: 'PUT',
      body: data,
    })

    if (response.ok)
      setRedirect(true);
  }

  if (redirect)
    return <Navigate to={`/post/${id}`} />;

  return (
    <form onSubmit={createNewPost}>
      <input type="text" placeholder='title'
        onChange={(e) => { setTitle(e.target.value) }} />

      <input type="text" placeholder='summary'
        onChange={(e) => { setSummary(e.target.value) }} />

      <input type="file" onChange={(e) => { setFiles(e.target.files) }} />

      <Editor value={content} onChange={setContent} />

      <button>Update Post</button>
    </form>
  )
}
