import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../Context/usercontext';

export default function Postpage() {
  const [postInfo, setPostInfo] = useState(null);
  const { id } = useParams(); // destructuring post id from url, to retrieve parameters from the URL.

  const { userInfo } = useContext(UserContext); // to check if current user is author => editing rights

  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then(
      (response) => {
        response.json().then(
          (postInfo) => {
            setPostInfo(postInfo);
          }
        )
      }
    )
  }, [])

  if (!postInfo)
    return '';

  return (
    <div className="post-page">
      <div className="image">
        <img src={"http://localhost:4000/" + postInfo.cover
        } alt="" />
      </div>

      <h1>
        {postInfo.title} by {postInfo.author}
      </h1>

      <div dangerouslySetInnerHTML={{ __html: postInfo.content }}></div>

    </div>
  )
}
