const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth");
const { isCommentOwner } = require("../middlewares/isCommentOwner");

router.delete("/:id", auth, isCommentOwner, async (req, res) => {
	const id = req.params.id;
	const comment = await prisma.comment.delete({
		where: { id: parseInt(id) },
	});

	res.json(comment);
});

router.post("/", auth, async (req, res) => {
	const { content, postId } = req.body;

	if (!content || !postId) {
		return res
			.status(400)
			.json({ message: "Content and postId are required" });
	}

	const comment = await prisma.comment.create({
		data: { 
			content,
			postId: parseInt(postId),
			userId: req.userId,
		},
	});

	res.json(comment);
});

module.exports = { commentsRouter: router };
