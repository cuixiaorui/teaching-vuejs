const isDev = process.env.NODE_ENV === "development";
const plugins = [];

if (!isDev) {
  plugins.push("transform-remove-console");
}

module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [...plugins]
};
