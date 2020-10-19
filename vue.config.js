module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tree-app/'
    : '/',
  outputDir: process.env.NODE_ENV === 'production'
    ? `${__dirname}/lib`
    : `${__dirname}/demo`,
  css: {
    extract: false,
  },
  chainWebpack: (config) => {
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();

    svgRule
      .test(/\.svg$/)
      .use('svg-url-loader') // npm install --save-dev svg-url-loader
      .loader('svg-url-loader');
  },
};
