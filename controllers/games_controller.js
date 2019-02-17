module.exports = (container) => {
  const GamesService = container.get('GamesService');

  return {
    async new(req, res, next) {
      try {
        req.session.gameNumber = GamesService.generate();

        res.json({});
      } catch (error) {
        next(error);
      }
    },
    async check(req, res, next) {
      try {
        const input = req.body;

        res.json({ result: 'BBK' });
      } catch (error) {
        next(error);
      }
    },
  };
};
