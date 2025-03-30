require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("./middlewares/auth");

const { usersRouter } = require("./routes/users");
app.use("/users", usersRouter);

app.get("/posts", async (req, res) => {
	const data = await prisma.post.findMany({
		include: { user: true, comments: true },
		orderBy: { id: "desc" },
		take: 5,
	});

	res.json(data);
});

app.get("/posts/:id", async (req, res) => {
	const id = req.params.id;
	const post = await prisma.post.findUnique({
		where: { id: parseInt(id) },
		include: {
			user: true,
			comments: {
				include: { user: true },
			},
		},
	});

	res.json(post);
});

app.post("/posts", auth, async (req, res) => {
	try {
		const { content } = req.body;
		
		if (!content) {
			return res.status(400).json({ message: "Content is required" });
		}
		
		const post = await prisma.post.create({
			data: {
				content,
				userId: req.userId,
			},
			include: {
				user: true,
			},
		});
		
		res.status(201).json(post);
	} catch (error) {
		console.error("Error creating post:", error);
		res.status(500).json({ message: "Failed to create post" });
	}
});

app.delete("/comments/:id", async (req, res) => {
	const id = req.params.id;
	const comment = await prisma.comment.delete({
		where: { id: parseInt(id) },
	});

	res.json(comment);
});

app.listen(8080, () => {
	console.log("Api running at 8080...");
});
