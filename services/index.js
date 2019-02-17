const GamesService = require('./games_service');

module.exports = (container) => {
  container.register('GamesService', GamesService);
};
