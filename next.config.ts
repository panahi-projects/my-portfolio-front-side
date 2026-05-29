import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Liara requires standalone output; set it ourselves so the value is correct
  // regardless of Liara's "setting standalone" build step.
  output: "standalone",
};

export default nextConfig;
