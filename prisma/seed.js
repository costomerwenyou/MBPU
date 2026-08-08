const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function main() {
  console.log("Seeding database...");

  // Seed settings
  const admissionSetting = await prisma.setting.upsert({
    where: { key: "is_admission_open" },
    update: {},
    create: {
      key: "is_admission_open",
      value: "false",
    },
  });
  console.log("Seeded setting:", admissionSetting);

  // Seed default admin
  const adminUsername = "admin";
  const adminPassword = "admin@mbpu"; // Default password
  const hashedPassword = await bcrypt.hash(adminPassword, 10);

  const adminUser = await prisma.user.upsert({
    where: { username: adminUsername },
    update: {},
    create: {
      username: adminUsername,
      password: hashedPassword,
    },
  });
  console.log("Seeded admin user:", adminUser.username);

  console.log("Seeding finished successfully!");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
