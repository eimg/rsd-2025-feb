const express = require("express");
const router = express.Router();

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const { auth } = require("../middlewares/auth");

router.get("/verify", auth, async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { id: req.userId },
    });

    delete user.password;

    res.json(user);
});

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

router.post("/login", async (req, res) => {
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const user = await prisma.user.findUnique({
        where: { username },
    });

    if(!user) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if(!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.json({ token, user });
});

module.exports = { usersRouter: router };
