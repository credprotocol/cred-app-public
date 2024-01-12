import resolveConfig from "tailwindcss/resolveConfig";

import config from "../../tailwind.config.js";

export const tailwindConfig = resolveConfig(config);
export const getTailwindColor = (name: string) =>
  tailwindConfig.theme.colors.cred[name] || tailwindConfig.theme.colors[name];
