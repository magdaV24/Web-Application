import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import session from "express-session";
import db from "./config/db.js";
import authRoute from "./routes/auth.js";
import postRoute from "./routes/post.js";
import commentRoute from "./routes/comment.js";
import childRoute from "./routes/children.js";

const app = express();

app.use(json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3001;

app.use(
  session({
    key: "userId",
    secret: "subscribe",
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: 60 * 60 * 24,
    },
  })
);

app.post("/create", (req, res) => {
  const title = req.body.title;
  const content = req.body.content;
  const createdBy = req.body.createdBy;

  db.query(
    "INSERT INTO posts (title, content, createdBy) VALUES (?, ?, ?)",
    [title, content, createdBy],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Values sent to the database!");
        console.log(result);
      }
    }
  );
});

app.use("/server/auth", authRoute);
app.use("/server/posts", postRoute);
app.use("/server/comment", commentRoute);
app.use("/server/child", childRoute);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
