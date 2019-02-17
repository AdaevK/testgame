module.exports = (router, container) => {
  const MainController = container.get('MainController');
  const GamesController = container.get('GamesController');

  router.get('/', MainController.index);

  router.get('/api/v1/games/new', GamesController.new);
  router.post('/api/v1/games/check', GamesController.check);
};
