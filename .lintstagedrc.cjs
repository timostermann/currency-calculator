// TODO: check again after eslint config is set up
// eslint-disable-next-line @typescript-eslint/no-require-imports
const path = require("path");

const prettierCommand = (filenames) =>
  `prettier --write ${filenames.map((filename) => `"${filename}"`).join(" ")}`;

const buildEslintCommand = (filenames) =>
  `eslint --cache --concurrency=4 --fix ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" ")}`;

const testCommand = (filenames) =>
  `npm run test -- related --run ${filenames
    .map((filename) => `"${filename}"`)
    .join(" ")}`;

module.exports = {
  "**/*.{js,cjs,mjs,jsx,mts,ts,tsx}": [buildEslintCommand],
  // TODO: check again after deps are set up
  // "**/*.{js,cjs,mjs,jsx,mts,ts,tsx}": [prettierCommand, buildEslintCommand],
  // "**/*.{json,yml,css}": [prettierCommand],
  // "**/*": [testCommand],
};
