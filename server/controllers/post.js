import db from "../config/db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = "SELECT * FROM posts";

  db.query(q, [req.query], (err, result) => {
    if (err) throw err;
    return res.status(200).json(result);
  });
};

export const getPost = (req, res) => {
  const q = "SELECT * FROM posts WHERE id = ?";

  db.query(q, [req.params.id], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result[0]);
  });
};

// export const deletePost = (req, res) => {

// }

export const editPost = (req, res) => {

  const id = req.params.id;
  const q = `UPDATE posts SET title = ?,  content = ? WHERE id = ${id}`;

  const title = req.body.title;
  const content = req.body.content;

  db.query(q, [title, content], (err, result) => {
    if (err) throw err;
    res.send("The new values had been sent to the database!");
  });
};
