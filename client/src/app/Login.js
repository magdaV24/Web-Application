import "./Form.css";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const input = {
    username: username,
    password: password
  }

  const { login } = useContext(AuthContext)

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      await login(input)
    } catch (error) {
      console.log(error);
    }

    setPassword('')
    setUsername('')
  };

  return (
    <main className="main">
      <form  onSubmit={(e) => handleSubmit(e)} className="form">
        <h4>Log into your account and let the fun begin!</h4>
        <label>
          <input
            type="text"
            required
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            className="form-input"
          />
          <span className="form-span">Username</span>
        </label>

        <label>
          <input
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="form-input"
          />
          <span className="form-span">Password</span>
        </label>
        <button  className="form-button">Log in!</button>
        <small>
          If you don't have an account,{" "}
          <Link to="/signin" className="link">
            sign up!
          </Link>
        </small>
      </form>
    </main>
  );
}
