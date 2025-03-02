const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function read() {
    const user = await prisma.user.findFirst({
        where: { id: 1 },
        include: { posts: true },
    });

    console.log(user);
}

read();
