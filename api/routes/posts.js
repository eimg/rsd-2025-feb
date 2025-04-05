const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth");

router.get("/", async (req, res) => {
	const data = await prisma.post.findMany({
		include: { user: true, comments: true },
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

module.exports = { postsRouter: router };
