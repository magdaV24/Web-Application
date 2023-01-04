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
  const token = req.cookies.access_token;
  if (!token) return res.status(401).json("Not authenticated!");

  jwt.verify(token, "jwtkey", (err, username) => {
    if (err) return res.status(403).json("Token is not valid!");

    const q = "UPDATE posts SET content = ?, title = ? WHERE id = ?";

    const title = req.body.title;
    const content = req.body.content;
    //const id = req.body.id

    const id = req.params.id;

    const edit = [title, content];

    db.query(q, [...edit, id, username], (err, result) => {
      if (err) throw err;
      res.send("The new values had been sent to the database!");
    });
  });
};
