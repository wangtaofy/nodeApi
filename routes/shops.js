// 店铺相关接口
const GROUP_NAME = 'shops';
// 引入joi校验数据结构
const Joi = require('joi');

module.exports = [
  // 获取店铺列表
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表'
    }
  },
  // 获取店铺的商品列表
  {
    method: 'GET',
    path: `/${GROUP_NAME}/shopId/goods`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺的商品列表',
      validate: {
        params: {
          shopId: Joi.string().required()
        }
      }
    }
  }
]