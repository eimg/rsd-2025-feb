const express = require("express");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/**
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 * @param {express.NextFunction} next - The next middleware function.
 */
async function isCommentOwner(req, res, next) {
	const commentId = req.params.id;
	const userId = req.userId;

	const comment = await prisma.comment.findUnique({
		where: { id: parseInt(commentId) },
		include: { user: true },
	});

	if (comment.user.id !== userId) {
		return res.status(401).json({ message: "Unauthorized" });
	}

	next();
}

module.exports = { isCommentOwner };
