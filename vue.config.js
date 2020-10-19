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
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: Infinity }));
  },
};
