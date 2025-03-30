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
    try {
        const { name, username, bio, password } = req.body;

        if (!name || !username || !password) {
            return res.status(400).json({ message: "Missing required fields" });
        }

        // Check if username already exists
        const existingUser = await prisma.user.findUnique({
            where: { username },
        });

        if (existingUser) {
            return res.status(409).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: { name, username, bio, password: hashedPassword },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        
        res.status(201).json(userWithoutPassword);
    } catch (error) {
        console.error("Registration error:", error);
        
        // Handle Prisma unique constraint error
        if (error.code === 'P2002' && error.meta?.target?.includes('username')) {
            return res.status(409).json({ message: "Username already taken" });
        }
        
        res.status(500).json({ message: "Failed to register user" });
    }
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

    // Remove password from response
    const { password: _, ...userWithoutPassword } = user;
    
    res.json({ token, user: userWithoutPassword });
});

module.exports = { usersRouter: router };
