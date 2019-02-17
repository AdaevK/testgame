const MainController = require('./main_controller');
const GamesController = require('./games_controller');

module.exports = (container) => {
  container.register('MainController', MainController);
  container.register('GamesController', GamesController);
};
