const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@api": path.resolve(__dirname, "src/utils/api"),
      "@reducers": path.resolve(__dirname, "src/services/reducers"),
      "@interfaces": path.resolve(__dirname, "src/services/interfaces"),
    },
  },
};