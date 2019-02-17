import request from 'axios';

const apiPath = '/api/v1';

export default {
  game: {
    new() {
      return request.get(`${apiPath}/games/new`);
    },
    check({ input }) {
      return request.post(`${apiPath}/games/check`, { input });
    },
  },
};
