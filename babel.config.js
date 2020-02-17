module.exports = function(api) {
  api.cache(true);

  // https://babeljs.io/docs/en/babel-preset-env#browserslist-integration
  const presets = [
    [
      "@babel/preset-env",
      {
        useBuiltIns: "entry"
      }
    ]
  ];
  const plugins = [];

  return {
    presets,
    plugins
  };
};
