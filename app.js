// 引入hapi
const Hapi = require('hapi');
const config = require('./config');
const routesHelloHapi = require('./routes/hello-hapi');

require('env2')('./.env');
const { env } = process;
// console.log('env', process.env.PORT);

const server = new Hapi.Server();
// 配置服务器启动host与端口
server.connection({
  port: env.PORT,
  host: env.HOST
});

const init = async () => {
  server.route([
    // 创建一个简单的hello hapi接口
    ...routesHelloHapi
  ]);

  // 启动服务
  await server.start();
  console.log(`Server runing at: ${server.info.uri}`);
}

init();