const { spawnSync } = require("child_process");

try {
  const nextBin = require.resolve("next/dist/bin/next");
  require(nextBin);
} catch (err) {
  const isWindows = process.platform === "win32";
  const cmd = isWindows ? "npx.cmd" : "npx";
  const result = spawnSync(cmd, ["next", ...process.argv.slice(2)], {
    stdio: "inherit",
    shell: true,
  });
  process.exit(result.status || 0);
}
