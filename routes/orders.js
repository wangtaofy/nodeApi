// 订单相关接口
const GROUP_NAME = 'orders';
// 引入joi校验数据结构
const Joi = require('joi');
// 通用校验配置
const {
  jwtHeaderDefine
} = require('../utils/router-helper');

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
      description: '创建订单',
      validate: {
        payload: {
          goodsList: Joi.array().items(
            Joi.object().keys({
              goods_id: Joi.number().integer(),
              count: Joi.number().integer()
            })
          )
        },
        ...jwtHeaderDefine
      }
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
        ...jwtHeaderDefine,
        params: {
          orderId: Joi.string().required()
        }
      }
    }
  }
]