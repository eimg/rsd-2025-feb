const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const { PrismaClient } = require("./generated/prisma");
const prisma = new PrismaClient();

app.get("/tasks", async (req, res) => {
	const tasks = await prisma.todo.findMany();
	res.json(tasks);
});

app.post("/tasks", async (req, res) => {
	const name = req.body?.name;

	if (!name) {
		return res.status(400).json({ error: "Name is required" });
	}

	const task = await prisma.todo.create({
		data: { name },
	});
	res.json(task);
});

app.put("/tasks/:id/toggle", async (req, res) => {
	const { id } = req.params;
	const task = await prisma.todo.update({
		where: { id: parseInt(id) },
		data: { done: true },
	});
	res.json(task);
});

app.delete("/tasks/:id", async (req, res) => {
	const { id } = req.params;
	const task = await prisma.todo.delete({
		where: { id: parseInt(id) },
	});
	res.json(task);
});

app.listen(8888, () => {
	console.log("Server is running on port 8888");
});
