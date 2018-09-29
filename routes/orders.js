// 订单相关接口
const GROUP_NAME = 'orders';
// 引入joi校验数据结构
const Joi = require('joi');

module.exports = [
  // 创建订单
  {
    method: 'POST',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建订单'
    }
  },
  // 订单支付
  {
    method: 'POST',
    path: `/${GROUP_NAME}/orderId/pay`,
    handler: async (request, reply) => {
      reply();
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '支付某条订单',
      validate: {
        params: {
          orderId: Joi.string().required()
        }
      }
    }
  }
]