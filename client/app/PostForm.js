import "./PostForm.css";
import React, { useContext, useState } from "react";
import Userbar from "../Components/Userbar";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";


export default function PostForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState('');

  const { currentUser } = useContext(AuthContext)
  
  const createPost = async (e) => {
    e.preventDefault();
    try {
      const response = axios.post("http://localhost:3001/create", {
        title: title,
        content: content,
        createdBy: currentUser.username
      }).then((res) => {
        console.log('Working')
        return res
      }).catch(err => console.log(err));
      console.log(response)
    } catch (error) {
      console.log(error)
    }
    setTitle('')
    setContent('')
  };

  return (
    <main>
      <Userbar />
      <form className="post-form"  onSubmit={(e) => createPost(e)}>
        <label>
          
        <span>Title</span>
          <input
            type="text"
            required
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label >
          {/* <ReactQuill theme="snow" style={{width: '350px', height: '200px', border: 'none'}} value={value} onChange={setValue} />; */}
          <textarea 
          onChange={e => setContent(e.target.value)}
          value={content}
          />
        </label>
        <button>Create post!</button>
      </form>
    </main>
  );
}
