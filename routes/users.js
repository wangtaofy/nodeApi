// 用户相关接口
const GROUP_NAME = 'users';
// 引入joi校验数据结构
const Joi = require('joi');
// 引入jsonwebtoken
const JWT = require('jsonwebtoken');
// 引入models
const models = require('../models');

module.exports = [
  // 签发JWT
  {
    method: 'POST',
    path: `/${GROUP_NAME}/createJWT`,
    handler: async (request, reply) => {
      const generateJWT = (jwtinfo) => {
        const payload = {
          userId: jwtinfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
        };
        return JWT.sign(payload, process.env.JWT_SECRET);
      }

      reply(generateJWT({
        userId: 1
      }));
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '签发JWT',
      // 约定此接口不参与 JWT 的用户验证，会结合 hapi-auth-jwt 来使用
      auth: false
    }
  }
]