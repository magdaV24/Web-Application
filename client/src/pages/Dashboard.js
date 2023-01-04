import "./Dashboard.css";
import React, { useEffect, useState } from "react";
import Userbar from "../Components/Userbar";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCommentDots,
  faHeart,
  faHeartCrack,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

export default function Dashbord() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3001/server/posts");
        setPosts(res.data);
      } catch (err) {
        setError(err);
      }
    };
    fetchData();
  }, []);
  return (
    <main>
      <Userbar />
      {error && <p>Could not fetch any data!</p>}
      <section className="posts">
        {posts &&
          posts.map((post) => (
            <div key={post.id} className="post-wrapper">
              <div className="post-content">
                <div style={{ alignItems: "center", gap: "15px" }}>
                  <h3>{post.title}</h3>
                  <p
                    style={{
                      fontSize: "15px",
                      opacity: ".7",
                      marginTop: "-15px",
                    }}
                  >
                    by {post.createdBy}
                  </p>
                </div>
                <p>{post.content.substring(0, 250)}...</p>
              </div>
              <div className="post-footer">
                <div className="dash-buttons">
                  <div className="dash-btn">
                    <p>
                      <FontAwesomeIcon icon={faHeart} />
                    </p>
                    <p>{post.likes}</p>
                  </div>
                  <div className="dash-btn">
                    <p>
                      <FontAwesomeIcon icon={faHeartCrack} />
                    </p>
                    <p>{post.dislikes}</p>
                  </div>
                  <div className="dash-btn">
                    <p>
                      <FontAwesomeIcon icon={faCommentDots} />
                    </p>
                    <p>{post.replies}</p>
                  </div>
                </div>
                <div className="dash-buttons">
                  <Link to={`/post/${post.id}`}>Read More</Link>
                  <Link to="/">Delete</Link>
                </div>
              </div>
            </div>
          ))}
      </section>
    </main>
  );
}
