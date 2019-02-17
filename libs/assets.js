const fs = require('fs');
const path = require('path');

module.exports = ({ env, prefex, manifestPath }) => {
  const isProd = env === 'production';
  let assets;
  if (isProd) {
    assets = JSON.parse(
      fs.readFileSync(path.join(manifestPath, 'assets-manifest.json')),
    );
  }

  const attributeToStr = attributes => Object.keys(attributes)
    .map((attribute) => {
      if (attributes[attribute] === true) {
        return `${attribute}`;
      }
      return `${attribute}="${attributes[attribute]}"`;
    })
    .join(' ');

  const getAsset = (name, type) => {
    let file;
    if (isProd) file = (assets[name] || {})[type];
    else file = `${name}.${type}`;

    return [prefex, file].join('/');
  };

  return function assetsMiddleware(req, res, next) {
    res.locals.javascriptTag = (name, attributes = {}) => `<script src="${getAsset(name, 'js')}" ${attributeToStr(
      attributes,
    )}></script>`;
    res.locals.stylesheetTag = (name, attributes = {}) => `<link rel="stylesheet" href="${getAsset(
      name,
      'css',
    )}" ${attributeToStr(attributes)}></link>`;
    if (next) next();
  };
};
