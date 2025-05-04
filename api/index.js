require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { usersRouter } = require("./routes/users");
app.use("/users", usersRouter);

const { postsRouter } = require("./routes/posts");
app.use("/posts", postsRouter);

const { commentsRouter } = require("./routes/comments");
app.use("/comments", commentsRouter);

const { notisRouter } = require("./routes/notis");
app.use("/notis", notisRouter);

app.listen(8080, () => {
	console.log("Api running at 8080...");
});
