import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  // Liara requires standalone output. Set it ourselves so the value is correct
  // regardless of Liara's "setting standalone" build step.
  output: "standalone",
  // Liara's "Modifying next config (setting standalone)" step rewrites the
  // exported config and drops the withNextIntl() wrapper — which is what injects
  // the next-intl request-config alias under Turbopack. We declare that alias
  // directly on the config object so it survives the rewrite; without it,
  // prerendering fails with "Couldn't find next-intl config file".
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
};

export default withNextIntl(nextConfig);
