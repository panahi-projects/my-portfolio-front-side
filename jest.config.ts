import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
};

// next-intl / use-intl ship ESM-only, which Jest can't run untransformed. next/jest
// hardcodes a node_modules ignore; drop it (keep only the CSS-modules guard) so every
// dependency is run through next/jest's SWC transform.
const buildConfig = async () => {
  const jestConfig = await createJestConfig(config)();
  jestConfig.transformIgnorePatterns = (jestConfig.transformIgnorePatterns ?? []).filter(
    (p) => !p.includes("node_modules"),
  );
  return jestConfig;
};

export default buildConfig;
