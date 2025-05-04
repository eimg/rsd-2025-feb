const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcrypt");
const { faker } = require("@faker-js/faker");

async function main() {
    const password = await bcrypt.hash("password", 10);
	await prisma.user.create({
		data: {
			name: "Alice",
			username: "alice",
			password,
		},
	});

    for (let i = 0; i < 5; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const username = firstName.toLowerCase() + lastName[0].toLowerCase();

        await prisma.user.upsert({
            where: { username },
            update: {},
            create: {
                name: `${firstName} ${lastName}`,
                username,
                password,
            },
        });
    }

    for (let i = 0; i < 10; i++) {
        await prisma.post.create({
            data: {
                content: faker.lorem.paragraph(),
                userId: faker.number.int({min: 1, max: 5}),
            },
        });
    }

    for (let i = 0; i < 40; i++) {
        await prisma.comment.create({
			data: {
				content: faker.lorem.sentence(),
				userId: faker.number.int({ min: 1, max: 5 }),
				postId: faker.number.int({ min: 1, max: 10 }),
			},
		});
    }

    // npx prisma migrate dev --name notis
    // npx prisma migrate reset
    await prisma.notification.createMany({
        data: [
            { type: "post_like", userId: 1, postId: 10, },
            { type: "post_like", userId: 1, postId: 9, },
            { type: "post_comment", userId: 1, postId: 8, },
        ],
    });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async e => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
