const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth");

router.get("/", async (req, res) => {
	const data = await prisma.post.findMany({
		include: { user: true, comments: true, postLikes: true },
		orderBy: { id: "desc" },
		take: 5,
	});

	res.json(data);
});

router.get("/:id", async (req, res) => {
	const id = req.params.id;
	const post = await prisma.post.findUnique({
		where: { id: parseInt(id) },
		include: {
			user: true,
			comments: {
				include: { user: true },
			},
			postLikes: {
				include: { user: true },
            },
		},
	});

	res.json(post);
});

router.post("/", auth, async (req, res) => {
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

router.post("/:id/like", auth, async (req, res) => {
	const { id } = req.params;
	const { userId } = req;

	const like = await prisma.postLike.create({
		data: { postId: parseInt(id), userId }
	});

	res.json(like);
});

router.delete("/:id/unlike", auth, async (req, res) => {
	const { id } = req.params;
	const { userId } = req;

	const result = await prisma.postLike.deleteMany({
		where: {
			AND: { postId: parseInt(id), userId }
		},
	});

	res.json(result);
});

module.exports = { postsRouter: router };
