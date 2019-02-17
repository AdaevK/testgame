module.exports = () => ({
  async new(req, res, next) {
    try {
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
});
