require('dotenv').config();
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const logger = require('./logger');
const routes = require('./routes');
const { NotFound } = require('./errors');
const assets = require('./assets');

const rootPath = process.cwd();
const env = process.env.NODE_ENV
  ? process.env.NODE_ENV
  : 'development';

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  switch (error.code) {
    case 'EACCES':
      this.logger.error(`${this.port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      this.logger.error(`${this.port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message || err.name });
}
module.exports = class Application {
  constructor() {
    this.port = process.env.PORT
      ? process.env.PORT
      : 3000;
    this.publicDir = path.join(rootPath, '/public');
    this.viewsDir = path.join(rootPath, '/views');
    this.assetsUrl = 'assets';

    this.container = {
      env,
      logger: logger({ env }),
    };
  }

  get logger() {
    return this.container.logger;
  }

  get env() {
    return this.container.env;
  }

  async start() {
    const server = express();
    server.disable('x-powered-by');
    server.set('views', this.viewsDir);
    server.set('view engine', 'pug');
    server.set('trust proxy', 1);

    server.use(morgan('combined', { stream: this.logger.stream }));
    server.use('/', express.static(this.publicDir));
    server.use(assets({
      env: this.env,
      prefex: this.assetsUrl,
      manifestPath: this.publicDir,
    }));

    if (['development', 'test'].includes(this.env)) {
      // eslint-disable-next-line import/no-extraneous-dependencies, global-require
      const proxy = require('http-proxy-middleware');
      server.use('/', proxy('/assets', {
        target: 'http://localhost:8080',
      }));
    }

    const router = express.Router();
    routes(router);
    server.use(router);
    server.use(() => { throw new NotFound('route not found'); });
    server.use(errorHandler);

    return server
      .listen(this.port, () => {
        this.logger.info(`[p ${process.pid}] Listening at port ${this.port}`);
      })
      .on('error', onError.bind(this));
  }

  static async start() {
    const instance = new Application();
    return instance.start();
  }
};
