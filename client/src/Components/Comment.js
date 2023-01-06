import "./Comments.css";
import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faReply, faThumbsDown, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";

export default function Comment({ comment }) {
  const [isReplaying, setIsReplaying] = useState(false);
  const { currentUser } = useContext(AuthContext);

  const [children, setChildren] = useState([]);

  const parentId = comment.uid

  useEffect(() => {
    const fetchChildren = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/server/child/get/${parentId}`
        );
        setChildren(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchChildren();
  }, [parentId]);

  //edit comments

  const [isEditing, setIsEditing] = useState(false)

  const EditBox = ({ comment }) => {
    const [newContent, setNewContent] = useState(comment.content);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentUser.username === comment.createdBy && comment.content !== '[deleted]') {
        const id = comment.id;
        if(comment.parentId === null){
          try {
            const response = await axios.put(
              `http://localhost:3001/server/comment/edit/${id}`,
              {
                content: newContent,
              }
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = await axios.put(
              `http://localhost:3001/server/child/edit/${id}`,
              {
                content: newContent,
              }
            );
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      }
    };

    return (
      <form onSubmit={handleSubmit} className='edit-form'>
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
        >{newContent}</textarea>
        <button>Submit edit</button>
      </form>
    );
  };
  
    //deleting comments

    const deleteComment = async (e) => {
      e.preventDefault();
      const id = comment.id;
      if(comment.createdBy === currentUser.username){
        if(comment.parentId === null){
          try {
            const response = axios.put(`http://localhost:3001/server/comment/delete/${id}`, {content: '[deleted]'})
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        } else {
          try {
            const response = axios.put(`http://localhost:3001/server/child/delete/${id}`, {content: '[deleted]'})
            console.log(response);
          } catch (error) {
            console.log(error);
          }
        }
      }
    }

    //liking comments

    const likeComment = async (comment, e) => {
      e.preventDefault();
      
      let likes = comment.likes;
      let dislikes = comment.dislikes;
      likes = likes + 1;
      console.log(comment.dislikedBy);

      const id = comment.id;

      if(comment.parentId === null){
        try {
          const response = await axios.put(
            `http://localhost:3001/server/comment/${id}`,
            {
              likes: likes,
              dislikes: dislikes,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.put(
            `http://localhost:3001/server/child/${id}`,
            {
              likes: likes,
              dislikes: dislikes,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
    
    
    //disliking comments

    const dislikeComment = async (comment, e) => {
      e.preventDefault();
      
      let likes = comment.likes;
      let dislikes = comment.dislikes;
      dislikes = dislikes + 1;

      const id = comment.id;

      if(comment.parentId === null){
        try {
          const response = await axios.put(
            `http://localhost:3001/server/comment/${id}`,
            {
              likes: likes,
              dislikes: dislikes,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          const response = await axios.put(
            `http://localhost:3001/server/child/${id}`,
            {
              likes: likes,
              dislikes: dislikes,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    }
  return (
    <>
      <div className="comment-wrapper">
        <div className="comment-user">
          <p>{comment.createdBy} commented:</p>
        </div>
        <div className="comment-content">
          <p>{comment.content}</p>
        </div>
        <div className="comment-actions">
          <div className="buttons">
            <button className="btns" onClick={(e) => likeComment(comment, e)} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}><FontAwesomeIcon icon={faThumbsUp} /><span>{comment.likes}</span></button>
            <button className="btns" onClick={(e) => dislikeComment(comment, e)} style={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}><FontAwesomeIcon icon={faThumbsDown} /><span>{comment.dislikes}</span></button>
            <button className="btns" onClick={() => setIsReplaying((prev) => !prev)}>
            <FontAwesomeIcon icon={faReply} />
            </button>
          </div>

          <div className="buttons delete">
            <button className="btns"><FontAwesomeIcon icon={faTrash} onClick={deleteComment}/></button>
            <button className="btns"><FontAwesomeIcon icon={faPen} onClick={() => setIsEditing(prev => !prev)}/></button>
          </div>
        </div>
      </div>

      {isReplaying && (
        <CommentForm
          postId={comment.postId}
          createdBy={currentUser.username}
          parentId={comment.uid}
        />
      )}
      {isEditing && <EditBox comment={comment} />}
      <div className="children">
        {children &&
          children.map((child) => (
            <div className="child" key={Math.random()}>
              <Comment comment={child} />
            </div>
          ))}
      </div>
    </>
  );
}
