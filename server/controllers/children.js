import db from "../config/db.js";

export const createChildren = (req, res) => {
  const q = "INSERT INTO children (content, createdBy, postId, parentId, uid) VALUES (?, ?, ?, ?, ?)";
  const content = req.body.content;
  const createdBy = req.body.createdBy;
  const postId = req.body.postId;
  const parentId = req.body.parentId;
  const uid = req.body.uid;

  db.query(q, [content, createdBy, postId, parentId, uid], (err, result) => {
    if (err) {
      console.log(err)
    } else {
        res.send("Child was sent to the database!");
        console.log(result);
    }
  });
};

export const getChildren = (req, res) => {
  const q = "SELECT * FROM children WHERE parentId = ?"

  db.query(q, [req.params.parentId], (err, result) => {
    if (err) return res.status(500).json(err);
    return res.status(200).json(result);
  });
}