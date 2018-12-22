// 引入hapi
const Hapi = require('hapi');
// const config = require('./config');
require('env2')('./.env');
const { env } = process;

// 引用自定义的hapi-swagger插件配置
const pluginHapiSwagger = require('./plugins/hapi-swagger');
// 引用分页插件
const pluginHapiPagination = require('./plugins/hapi-pagination');
// 引入hapi-auth-jwt2插件配置
const hapiAuthJWT2 = require('hapi-auth-jwt2');
const pluginHapiAuthJwt2 = require('./plugins/hapi-auth-jwt2');

// 接口文件
const routesHelloHapi = require('./routes/hello-hapi');
const routesShops = require('./routes/shops');
const routesOrders = require('./routes/orders');
const routesUsers = require('./routes/users');
const routesWxUploads = require('./routes/wx-uploads');
const routerRecipes = require('./routes/recipes');
// console.log('env', process.env.PORT);

// 配置服务器启动host与端口
const server = new Hapi.Server();
server.connection({
  port: env.PORT,
  host: env.HOST
});

const init = async () => {
  // 插件
  await server.register([
    ...pluginHapiSwagger,
    pluginHapiPagination,
    hapiAuthJWT2
  ]);
  pluginHapiAuthJwt2(server);
  // 接口
  server.route([
    ...routesHelloHapi,
    ...routesShops,
    ...routesOrders,
    ...routesUsers,
    ...routesWxUploads,
    ...routerRecipes
  ]);

  // 启动服务
  await server.start();
  console.log(`Server runing at: ${server.info.uri}`);
}

init();