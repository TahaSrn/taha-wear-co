import fs from "node:fs/promises";
import fg from "fast-glob";
import { parse } from "@babel/parser";
import generate from "@babel/generator";

const files = await fg([
  "**/*.{js,jsx,ts,tsx}",
  "!node_modules/**",
  "!dist/**",
  "!build/**",
  "!.git/**",
]);

for (const file of files) {
  const code = await fs.readFile(file, "utf8");

  const ast = parse(code, {
    sourceType: "module",
    plugins: [
      "jsx",
      "typescript",
      "classProperties",
      "classPrivateProperties",
      "classPrivateMethods",
      "dynamicImport",
      "optionalChaining",
      "nullishCoalescingOperator",
    ],
    attachComment: false,
  });

  const output = generate(ast, {
    comments: false,
    retainLines: true,
  }).code;

  await fs.writeFile(file, output);
  console.log("✔", file);
}

console.log("\n✅ All comments removed safely.");
