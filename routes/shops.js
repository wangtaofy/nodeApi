// 店铺相关接口
const GROUP_NAME = 'shops';
// 引入joi校验数据结构
const Joi = require('joi');
// 引入models
const models = require('../models');
// 通用校验配置
const {
  paginationDefine,
  jwtHeaderDefine
} = require('../utils/router-helper');

module.exports = [
  // 获取店铺列表
  {
    method: 'GET',
    path: `/${GROUP_NAME}`,
    handler: async (request, reply) => {
      const { rows: results, count: totalCount } = await models.shops.findAndCountAll({
        attributes: [
          'id',
          'name',
        ],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit,
      });
      // 开启分页的插件，返回的数据结构里，需要带上 results 与 totalCount 两个字段
      reply({
        results,
        totalCount
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺列表',
      auth: false,
      validate: {
        query: paginationDefine
      }
    }
  },
  // 获取店铺的商品列表
  {
    method: 'GET',
    path: `/${GROUP_NAME}/{shopId}/goods`,
    handler: async (request, reply) => {
      const { rows: results, count: totalCount } = await models.goods.findAndCountAll({
        // 基于shop_id的条件查询
        where: {
          shop_id: request.params.shopId
        },
        attributes: ['id', 'name', 'thumb_url'],
        limit: request.query.limit,
        offset: (request.query.page - 1) * request.query.limit
      });
      reply({
        results,
        totalCount
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取店铺的商品列表',
      auth: false,
      validate: {
        params: {
          shopId: Joi.string().required()
        },
        query: paginationDefine
      }
    }
  },
  // 添加店铺
  {
    method: 'POST',
    path: `/${GROUP_NAME}/add`,
    handler: async (request, reply) => {
      models.shops.create({
        name: request.payload.shopName,
        thumb_url: request.payload.thumbUrl,
        address: request.payload.address
      }).then((result) => {
        reply({
          code: 200,
          mesg: '添加成功'
        });
      });
    },
    config: {
      // 跨域
      // cors: true,
      tags: ['api', GROUP_NAME],
      description: '添加店铺',
      validate: {
        ...jwtHeaderDefine,
        payload: {
          shopName: Joi.string().required(),
          thumbUrl: Joi.string().allow(''),
          address: Joi.string().allow('')
        }
      }
    }
  },
  // 给指定店铺添加商品
  {
    method: 'POST',
    path: `/${GROUP_NAME}/addGoods`,
    handler: async (request, reply) => {
      models.goods.create({
        shop_id: request.payload.shopId,
        name: request.payload.goodName,
        thumb_url: request.payload.thumbUrl
      }).then((result) => {
        reply({
          code: 200,
          msg: '添加成功'
        });
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '给指定店铺添加商品',
      validate: {
        ...jwtHeaderDefine,
        payload: {
          shopId: Joi.number().required(),
          goodName: Joi.string().required(),
          thumbUrl: Joi.string().allow('')
        }
      }
    }
  }
]