module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: (request, reply) => {
      reply('Hello Hapi');
    },
    config: {
      tags: ['api', 'tests'],
      description: '测试hello-hapi'
    }
  }
]