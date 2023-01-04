import "./Comments.css";
import React, { useContext, useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

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
            <button className="btns">{comment.likes}</button>
            <button className="btns">{comment.dislikes}</button>
            <button className="btns" onClick={() => setIsReplaying((prev) => !prev)}>
              Reply
            </button>
          </div>

          <div className="buttons delete">
            <button className="btns">Delete</button>
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
