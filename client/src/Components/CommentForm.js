import "./Comments.css";
import React, { useState } from "react";
import axios from "axios";
import { uid } from 'uid'

export default function CommentForm({ postId, createdBy, parentId }) {
  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

   if(parentId === null){
    try {
      const response = axios
        .post("http://localhost:3001/server/comment/create", {
          content: content,
          createdBy: createdBy,
          postId: postId,
          parentId: parentId,
          uid: uid()
        })
        .then((res) => {
          console.log("It worked!");
          return res;
        })
        .catch((err) => console.log(err));;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
   } else{
    try {
      const response = axios
        .post("http://localhost:3001/server/child/create", {
          content: content,
          createdBy: createdBy,
          postId: postId,
          parentId: parentId,
          uid: uid()
        })
        .then((res) => {
          console.log("It worked!");
          return res;
        })
        .catch((err) => console.log(err));;
      console.log(response);
    } catch (error) {
      console.log(error);
    }
   }
    setContent("");
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea 
        onChange={(e) => setContent(e.target.value)}  
        value={content} 
        />
      <button className="comm-btn">Comment</button>
    </form>
  );
}
