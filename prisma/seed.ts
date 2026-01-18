import { UserRole } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";


async function main() {
  await prisma.user.upsert({
    where: { username: 'administrator' },
    update: {},
    create: {
        fullName : 'Administrator',
        username: 'administrator',
        role: UserRole.ADMIN
    },
  })

  console.log("Admin user created");
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })