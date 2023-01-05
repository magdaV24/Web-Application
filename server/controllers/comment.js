import db from "../config/db.js";

export const createComments = (req, res) => {
  const q =
    "INSERT INTO comments (content, createdBy, postId, parentId, uid) VALUES (?, ?, ?, ?, ?)";
  const content = req.body.content;
  const createdBy = req.body.createdBy;
  const postId = req.body.postId;
  const parentId = req.body.parentId;
  const uid = req.body.uid;

  db.query(q, [content, createdBy, postId, parentId, uid], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Comment was sent to the database!");
      console.log(result);
    }
  });
};

export const getComments = (req, res) => {
  const q = "SELECT * FROM comments WHERE postId = ?";

  db.query(q, [req.params.postId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
};

export const deleteComment = (req, res) => {
  const id = req.params.id;
  const q = `UPDATE comments SET content = ? WHERE id = ${id}`;

  const content = req.body.content;

  db.query(q, content, (err, result) => {
    if (err) throw err;
    res.send("The new values had been sent to the database!");
  });
};

export const editComment = (req, res) => {
  const id = req.params.id;
  const q = `UPDATE comments SET content = ? WHERE id = ${id}`;

  const content = req.body.content;

  db.query(q, content, (err, result) => {
    if (err) throw err;
    res.send("The new values had been sent to the database!");
  });
};

export const likeDislikeComment = (req, res) => {
  const id = req.params.id;
  const q = `UPDATE comments SET likes = ?, dislikes = ? WHERE id = ${id}`;

  const likes = req.body.likes;
  const dislikes = req.body.dislikes;

  db.query(q, [likes, dislikes], (err, result) => {
    if (err) throw err;
    res.send("The new values had been sent to the database!");
  });
};
