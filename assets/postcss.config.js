module.exports = {
  plugins: [
    // eslint-disable-next-line global-require
    require('autoprefixer')({
      browsers: ['> 1%', 'last 2 versions'],
    }),
  ],
};
