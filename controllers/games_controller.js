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
        const { input } = req.body;

        const { result } = GamesService.check({
          number: req.session.gameNumber,
          input,
        });

        res.json({ result });
      } catch (error) {
        next(error);
      }
    },
  };
};
