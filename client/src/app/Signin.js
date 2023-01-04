import "./Form.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confPass, setConfPass] = useState("");
  const [picture, setPicture] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const checkPassword = async (pass1, pass2) => {
      if (pass1 === pass2) {
        return true;
      } else {
        return false;
      }
    };

    if (checkPassword(password, confPass)) {
      try {
        const response = axios
          .post("http://localhost:3001/server/auth/signin", {
            email: email,
            username: username,
            password: password,
            picture: picture,
          })
          .then((res) => {
            console.log("It worked!");
            return res;
          })
          .catch((err) => console.log(err));
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("The passwords do not match!");
    }

    setEmail("");
    setPassword("");
    setConfPass("");
    setUsername("");
    setPicture("");
  };

  return (
    <main className="main">
      <form onSubmit={handleSubmit} className="form">
        <h4>Create a account right now and start a new adventure!</h4>
        <label>
          <input
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="form-input"
          />
          <span className="form-span">Email address</span>
        </label>
        <label>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="form-input"
          />
          <span  className="form-span">Username</span>
        </label>
        <label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-input"
          />
          <span  className="form-span">Password</span>
        </label>
        <label>
          <input
            type="password"
            required
            onChange={(e) => setConfPass(e.target.value)}
            value={confPass}
            className="form-input"
          />
          <span className="form-span">Confirm Password</span>
        </label>
        <label className="file-label">
        <span>Choose a profile picture:</span>
          <input
            type="file"
            onChange={(e) => setPicture(e.target.value)}
            value={picture}
            className="file-input"
          />
        </label>
        {/* <label>
        <input 
            type='checkbox' 
            className="checkbox"
            />
        <span>By clicking here, I state that I have read and understood the terms and conditions.</span>
        </label> */}
        <button className="form-button">Sign up!</button>
        <small>
          If you already have an account,{" "}
          <Link to="/login" className="link">
            log in!
          </Link>
        </small>
      </form>
    </main>
  );
}
