// 用户相关接口
const GROUP_NAME = 'users';

// 引入joi校验数据结构
const Joi = require('joi');
// 引入jsonwebtoken
const JWT = require('jsonwebtoken');
// 引入models
const models = require('../models');
// 引入config
const config = require('../config');
// 引入axios
const axios = require('axios');
// 引入decrypt-data
const decryptData = require('../utils/decrypt-data');

module.exports = [
  // 用户登录, 签发JWT
  {
    method: 'POST',
    path: `/${GROUP_NAME}/wxLogin`,
    handler: async (request, reply) => {
      // 获取oppenid、session_key
      const appid = config.wxAppid;
      const appSecret = config.wxAppsecret;
      const { code, encryptedData, iv } = request.payload;
      
      const reponse = await axios({
        method: 'GET',
        url: 'https://api.weixin.qq.com/sns/jscode2session',
        params: {
          appid: appid,
          secret: appSecret,
          js_code: code,
          grant_type: 'authorization_code'
        }
      });
      const { openid, session_key } = reponse.data;

      // // 基于oppenid 查找或创建一个用户
      const user = await models.users.findCreateFind({
        where: {
          open_id: openid
        }
      });

      // 解密encryptedData用户信息
      const userInfo = decryptData(encryptedData, iv, session_key, appid);
      // console.log(userInfo);
      // 更新users表中用户信息
      await models.users.update({
        nick_name: userInfo.nickName,
        avatar_url: userInfo.avatarUrl,
        gender: userInfo.gender,
        open_id: openid,
        session_key: session_key
      },{
        where: {
          open_id: openid
        }
      });

      // 签发jwt
      const generateJWT = (jwtinfo) => {
        const payload = {
          userId: jwtinfo.userId,
          exp: Math.floor(new Date().getTime() / 1000) + 7 * 24 * 60 * 60
        };

        return JWT.sign(payload, config.jwtSecret);
      };

      let result = {
        token: generateJWT({ userId: user[0].id })
      };

      reply(result);
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '用户登录, 签发JWT',
      auth: false,
      validate: {
        payload: {
          code: Joi.string().required().description('微信用户登录的临时code'),
          encryptedData: Joi.string().required().description('微信用户信息encryptedData'),
          iv: Joi.string().required().description('微信用户信息iv')
        }
      }
    }
  }
]