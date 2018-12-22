const {
  jwtHeaderDefine
} = require('../utils/router-helper');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      console.log(request.auth.credentials);
      reply('Hello Hapi');
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试jwt',
      validate: {
        ...jwtHeaderDefine
      }
    }
  }
]