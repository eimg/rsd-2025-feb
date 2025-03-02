const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

prisma.user.update({
    where: { id: 1 },
    data: {
        email: 'alice@example.com',
    }
}).then(user => {
    console.log(user);
});
