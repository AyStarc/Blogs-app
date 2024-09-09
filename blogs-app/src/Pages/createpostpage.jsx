import React, { useContext,useState } from 'react'
import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import { Navigate } from 'react-router-dom';
import Editor from '../Components/editor';
import { UserContext } from '../Context/usercontext';


export default function Createpostpage() {
    const [redirect, setRedirect] = useState(false);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');

    const { userInfo } = useContext(UserContext);


    async function createNewPost(e) {
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        data.set('file', files?.[0]);
        console.log(userInfo.username);
        data.set('author',userInfo.username);

        e.preventDefault();
        const response = await fetch('http://localhost:4000/post',
            {
                method: 'POST',
                body: data,
            }
        )

        if (response.ok) {
            setRedirect(true);
        }
    }

    if (redirect) {
        alert("Success")
        return <Navigate to={'/'} />
    }

    return (
        <form onSubmit={createNewPost}>
            <input type="text" placeholder='title'
                onChange={(e) => { setTitle(e.target.value) }} />

            <input type="text" placeholder='summary'
                onChange={(e) => { setSummary(e.target.value) }} />

            <input type="file" onChange={(e) => { setFiles(e.target.files) }} />

            <Editor value={content} onChange={setContent}>

            </Editor>

            <button>Create Post</button>
        </form>
    )
}
