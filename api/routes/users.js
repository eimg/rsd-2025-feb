const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

router.post("/register", async (req, res) => {
    const { name, username, bio, password } = req.body;

    if(!name || !username || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: { name, username, bio, password: hashedPassword },
    });

    res.json(user);
});

module.exports = { usersRouter: router };
