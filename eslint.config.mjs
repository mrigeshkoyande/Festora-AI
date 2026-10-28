import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: ["node_modules/**", ".next/**", "reports/**", "public/**", "graphify-out/**"] },
  ...nextVitals,
];

export default config;
