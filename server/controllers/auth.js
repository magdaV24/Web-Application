import db from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signin = (req, res) => {
  // Step 1. Look for any user that may have the same username or email address.

  const q = "SELECT * FROM users WHERE email = ? OR username = ?";

  db.query(q, [req.body.email, req.body.username], (err, result) => {
    if (err) throw err;
    if (result.length) return res.status(409).json("User already exists!");

    // Step 2. Hash the passowrd using bcrypt.js and create the user, if it doesn't already exist.
    const saltRounds = 10;

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    const picture = req.body.picture;
    const q =
      "INSERT INTO users (username, email, password, profile_picture) VALUES (?, ?, ?, ?)";

    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }
      db.query(q, [username, email, hash, picture], (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values were sent to the database!");
          console.log(result);
        }
      });
    });
  });
};

export const login = (req, res) => {
  const q = "SELECT * FROM users WHERE username = ?";

  db.query(q, [req.body.username], (err, result) => {
    if (err) return res.status(500).json(err);
    if (result.length === 0)
      return res.status(404).json("User does not exist!");

    const checkPassword = bcrypt.compareSync(
      req.body.password,
      result[0].password
    );

    if (!checkPassword) {
      return res.status(400).json("Wrong username/passwordd combination!")
    }
    
  const token = jwt.sign(
    {
      id: result[0].id,
    },
    "jwtkey"
  );

  const { password, ...other } = result[0];

  res.cookie("access_token", token, {
      httpOnly: true,
    }).status(200).json(other);
  });
};

export const logout = (req, res) => {
  res.clearCookie("access_token", {
    siteName: "none",
    secure: true
  }).status(200).json("User has be succsessfullyy logged out!")
};

