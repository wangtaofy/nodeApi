// 引入hapi
const Hapi = require('hapi');
// const config = require('./config');
require('env2')('./.env');
const { env } = process;

// 引用自定义的hapi-swagger插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');

// 接口文件
const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
// console.log('env', process.env.PORT);

const server = new Hapi.Server();
// 配置服务器启动host与端口
server.connection({
  port: env.PORT,
  host: env.HOST
});

const init = async () => {
  await server.register([
    // 为系统使用hapi-swagger
    ...pluginHapiSwagger
  ]);
  server.route([
    // 创建一个简单的hello hapi接口
    ...routesHelloHapi,
    ...routesShops,
    ...routesOrders
  ]);

  // 启动服务
  await server.start();
  console.log(`Server runing at: ${server.info.uri}`);
}

init();