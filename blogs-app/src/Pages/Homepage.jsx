import React, { useEffect, useState } from 'react'
import Post from '../Components/post'

export default function Homepage() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {

        fetch('http://localhost:4000/post').then((response) => {
            response.json().then(
                (posts) => {
                    setPosts(posts);
                }
            )
        })

    }, [])
    return (
        <>
            {posts.length > 0 && posts.map(post => {
                // console.log(post.cover);
                return <Post {...post} />
            })}
        </>
    )
}
