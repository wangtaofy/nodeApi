// 食谱相关接口
const GROUP_NAME = 'recipes';
// 引入joi校验数据结构
const Joi = require('joi');
// 引入models
const models = require('../models');
// 引入jwt header 验证
const { jwtHeaderDefine } = require('../utils/router-helper');

module.exports = [
  /** 
   * 获取食谱列表
   * @params
   * id: 通过id获取食谱
   * */
  {
    method: 'GET',
    path: `/${GROUP_NAME}/get`,
    handler: async (request, reply) => {
      let result;
      // 食谱id
      const id = request.query.id;
      // console.log(request.query, id);
      if (id) {
        // 有id，根据id查找食谱
        result = await models.recipes.findById(id, {
          attributes: ['id', 'name']
        });
      } else {
        // 查询所有食谱
        result = await models.recipes.findAll({
          attributes: ['id', 'name']
        });
      }

      reply({
        code: 200,
        data: result
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '获取食谱列表',
      auth: false,
      validate: {
        query: {
          id: Joi.number().description('食谱id')
        }
      }
    }
  },
  /**
   * 创建食谱
   * @params:
   *  */
  {
    method: 'POST',
    path: `/${GROUP_NAME}/create`,
    handler: async (request, reply) => {
      // 获取请求参数
      // console.log(request.payload, request.auth.credentials.userId);
      let payload = request.payload;
      models.recipes.create({
        name: payload.name,
        cooking_time: payload.cookingTime,
        prep_time: payload.prepTime,
        cuisine: payload.cuisine,
        ingredients: payload.ingredients,
        directions: payload.directions,
        user_id: request.auth.credentials.userId,
        createdAt: Date.now()
      }).then((result) => {
        reply({
          code: 200,
          message: 'OK'
        });
      })
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '创建食谱',
      validate: {
        payload: {
          name: Joi.string().required().description('食谱名称'),
          cookingTime: Joi.string().required().description('烹饪时间'),
          prepTime: Joi.string().required().description('准备时间'),
          cuisine: Joi.string().required().description('食谱分类'),
          ingredients: Joi.string().required().description('原材料'),
          directions: Joi.string().required().description('烹饪步骤')
        },
        ...jwtHeaderDefine
      }
    }
  }
];