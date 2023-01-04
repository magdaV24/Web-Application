import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Userbar from "../Components/Userbar";
import "./Post.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  //faCommentDots,
  faHeart,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import CommentForm from "../Components/CommentForm";
import { AuthContext } from "../context/AuthContext";
import Comments from "../Components/Comments";

export default function Post() {
  const [post, setPost] = useState();
  const [error, setError] = useState();
  const { currentUser } = useContext(AuthContext);

  const loc = useLocation();
  const id = loc.pathname.split("/")[2];

  //fetching the post

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/server/posts/${id}`);
        setPost(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, [id]);

  ///////

  const [isEditing, setIsEditing] = useState(false);

  const EditBox = ({ post }) => {
    const [newContent, setNewContent] = useState("");
    const [newTitle, setNewTitle] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentUser.username === post.createdBy) {
        const id = post.id;
        try {
          const response = await axios.put(
            `http://localhost:3001/server/posts/${id}`,
            {
              title: newTitle,
              content: newContent,
            }
          );
          setNewContent("");
          setNewTitle("");
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <form onSubmit={handleSubmit}>
        <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
        />
        <button>Submit edit</button>
      </form>
    );
  };
  return (
    <>
      {error && <p>Could not fetch the data!</p>}
      {post && (
        <div className="post-page">
          <Userbar />
          <section className="content-wrapper">
            <div className="created-by">By {post.createdBy}</div>

            <div className="content">
              <h2>{post.title}</h2>
              <p>{post.content}</p>
            </div>

            <div className="buttons">
              <button className="btn">
                <FontAwesomeIcon icon={faHeart} />
                <p>{post.likes}</p>
              </button>
              <button className="btn">
                <FontAwesomeIcon icon={faHeartCrack} />
                <p>{post.dislikes}</p>
              </button>
              <button className="btn-edit" onClick={() => setIsEditing((prev) => !prev)}>
                Edit
              </button>
            </div>

            {isEditing && <EditBox post={post} />}

            <div className="post-comments">
              <p>Comment below:</p>
              <CommentForm
                postId={post.id}
                createdBy={currentUser.username}
                parentId={null}
              />
            </div>

            <div className="comments">
              <Comments post={post} />
            </div>
          </section>
        </div>
      )}
    </>
  );
}
