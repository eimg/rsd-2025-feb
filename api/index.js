const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

app.get("/posts", async (req, res) => {
    const data = await prisma.post.findMany({
        include: { user: true, comments: true },
        orderBy: { id: "desc" },
        take: 5,
    });

    setTimeout(() => {
        res.json(data);
    }, 2000);
});

app.get("/posts/:id", async (req, res) => {
    const id = req.params.id;
    const post = await prisma.post.findUnique({
        where: { id: parseInt(id) },
        include: { user: true, comments: true },
    });

    res.json(post);
});

app.listen(8080, () => {
    console.log("Api running at 8080...");
});
