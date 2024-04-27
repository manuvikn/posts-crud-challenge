const {
  shareAll,
  withModuleFederationPlugin,
} = require("@angular-architects/module-federation/webpack");

module.exports = withModuleFederationPlugin({
  name: "citySights",

  exposes: {
    // Update this whole line (both, left and right part):
    "./PostsCrudChallengeModule":
      "./src/app/posts-crud-challenge/posts-crud-challenge.module.ts",
  },

  shared: {
    ...shareAll({
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    }),
  },
});
