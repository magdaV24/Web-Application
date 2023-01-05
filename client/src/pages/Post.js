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
  faPenToSquare,
  faTrash,
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

  // fetching the post

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

  // editing the post

  const [isEditing, setIsEditing] = useState(false);

  const EditBox = ({ post }) => {
    const [newContent, setNewContent] = useState(post.content);
    const [newTitle, setNewTitle] = useState(post.title);

    const handleSubmit = async (e) => {
      e.preventDefault();
      if (currentUser.username === post.createdBy) {
        const id = post.id;
        try {
          const response = await axios.put(
            `http://localhost:3001/server/posts/edit/${id}`,
            {
              title: newTitle,
              content: newContent,
            }
          );
          console.log(response);
        } catch (error) {
          console.log(error);
        }
      }
    };

    return (
      <form onSubmit={handleSubmit} className="edit-form">
        <input onChange={(e) => setNewTitle(e.target.value)} value={newTitle} />
        <textarea
          onChange={(e) => setNewContent(e.target.value)}
          value={newContent}
        >
          {newContent}
        </textarea>
        <button>Submit edit</button>
      </form>
    );
  };

  //liking a post

  const likePost = async (post, e) => {
    e.preventDefault();

    let likes = post.likes;
    let dislikes = post.dislikes;
    likes = likes + 1;

    const id = post.id;
    try {
      const response = await axios.put(
        `http://localhost:3001/server/posts/${id}`,
        {
          likes: likes,
          dislikes: dislikes,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //disliking a post

  const dislikePost = async (post, e) => {
    e.preventDefault();

    let likes = post.likes;
    let dislikes = post.dislikes;
    dislikes = dislikes + 1;
    const id = post.id;
    try {
      const response = await axios.put(
        `http://localhost:3001/server/posts/${id}`,
        {
          likes: likes,
          dislikes: dislikes,
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  //deleting a post
  const deletePost = async (e) => {
    e.preventDefault();

    try {
      const response = axios.delete(`http://localhost:3001/server/posts/${id}`);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const [isAsking, setIsAsking] = useState(false);
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
              <div className="group">
                <button className="btn" onClick={(e) => likePost(post, e)}>
                  <FontAwesomeIcon icon={faHeart} />
                  <p>{post.likes}</p>
                </button>
                <button className="btn" onClick={(e) => dislikePost(post, e)}>
                  <FontAwesomeIcon icon={faHeartCrack} />
                  <p>{post.dislikes}</p>
                </button>
              </div>
              {currentUser.username === post.createdBy && (
                <div className="group">
                  <button
                    className="btn-edit"
                    onClick={() => setIsEditing((prev) => !prev)}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                  <button
                    className="btn-edit"
                    onClick={() => setIsAsking((prev) => !prev)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
            </div>

            {isEditing && <EditBox post={post} />}
            {isAsking && (
              <div className="ask-box">
                <span>Are you sure you want to delete this post?</span>
                <button onClick={deletePost}>Yes</button>
                <button onClick={() => setIsAsking((prev) => !prev)}>No</button>
              </div>
            )}

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
