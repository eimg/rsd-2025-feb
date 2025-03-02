const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function remove() {
    await prisma.post.deleteMany();

	const result = await prisma.user.delete({
		where: { id: 1 },
	});

    console.log(result);
}

remove();
