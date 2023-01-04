import './Comments.css'
import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import axios from 'axios'

export default function Comments({post}) {
    const [comments, setComments] = useState([])

    const postId = post.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/server/comment/get/${postId}`)
                setComments(response.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData()
    }, [postId])
  return (
    <div className='comments-wrapper'>
        {comments && comments.map((comment) => (
            <Comment comment={comment} key={Math.random()}/>
        ))}
    </div>
  )
}
