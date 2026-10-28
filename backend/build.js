const { spawnSync } = require("child_process");

console.log("1. Generating Prisma Client...");
try {
  const prismaBin = require.resolve("prisma/build/index.js");
  const result = spawnSync(process.execPath, [prismaBin, "generate"], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error("Prisma generate exited with code:", result.status);
    process.exit(result.status || 1);
  }
} catch (err) {
  console.error("Error running prisma generate:", err);
  process.exit(1);
}

console.log("2. Compiling TypeScript...");
try {
  const tscBin = require.resolve("typescript/bin/tsc");
  const result = spawnSync(process.execPath, [tscBin], {
    stdio: "inherit",
  });
  if (result.status !== 0) {
    console.error("TypeScript compilation exited with code:", result.status);
    process.exit(result.status || 1);
  }
} catch (err) {
  console.error("Error running TypeScript compiler:", err);
  process.exit(1);
}

console.log("Build completed successfully!");
