import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Generated artifacts. Linting these made `npm run lint` output depend on
    // whether coverage/E2E had been run locally — a clean checkout and a
    // post-test checkout reported different warning counts.
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "blob-report/**",
    ".lighthouseci/**",
  ]),
  {
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          // `const { omitMe, ...rest } = props` is a deliberate omit idiom,
          // used in the framer-motion test mocks to strip animation props
          // before spreading onto a DOM node.
          ignoreRestSiblings: true,
          // Opt out explicitly by prefixing with an underscore.
          varsIgnorePattern: "^_",
          argsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "react-hooks/set-state-in-effect": "off",
      "react/display-name": "off",
    },
  },
]);

export default eslintConfig;
