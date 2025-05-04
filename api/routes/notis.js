const express = require("express");
const router = express.Router();

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth");

router.get("/", auth, async (req, res) => {
	const { userId } = req;
    
	const notis = await prisma.notification.findMany({
		where: { post: { userId } },
        include: { user: true, post: true },
		take: 10,
		orderBy: { created: "desc" },
	});

	res.json(notis);
});

router.put("/", auth, async (req, res) => {
	const { userId } = req;

	const notis = await prisma.notification.updateMany({
		where: { userId },
		data: { read: true },
	});

	res.json(notis);
});

router.put("/:id", auth, async (req, res) => {
	const { id } = req.params;
	const { userId } = req;

	const noti = await prisma.notification.update({
		where: { id: parseInt(id), userId },
		data: { read: true },
	});

	res.json(noti);
});

module.exports = { notisRouter: router };
