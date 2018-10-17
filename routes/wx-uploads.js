// 微信上传相关接口
const GROUP_NAME = 'wxUploads';

const Joi = require('joi');
const fs = require('fs');
const axios = require('axios');

module.exports = [
  // 上传录音
  {
    method: 'POST',
    path: `/${GROUP_NAME}/record`,
    handler: async (request, reply) => {
      // console.log(Buffer.alloc(10));

      const { record } = request.payload;
      // fs.writeFile('record.aac', record, (res) => {
      //   console.log(res);
      // });

      reply({
        code: 200,
        message: 'success',
        record: record
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '上传录音',
      auth: false
    }
  },
  // 微信授权
  {
    method: 'POST',
    path: `/${GROUP_NAME}/scope`,
    handler: async (request, reply) => {
      const code = request.payload.code;

      // 获取access_token
      const result = (await axios({
        method: 'GET',
        url: `https://api.weixin.qq.com/sns/oauth2/access_token?appid=wxf3a2bf940ebd9402&secret=49c94bf4e899fa66d87c50e1975a3432&code=${code}&grant_type=authorization_code`
      })).data;
      const access_token = result.access_token;
      const openid = result.openid;

      // 拉取用户信息
      const userInfo = (await axios({
        method: 'GET',
        url: `https://api.weixin.qq.com/sns/userinfo?access_token=${access_token}&openid=${openid}&lang=zh_CN`
      })).data;

      reply({
        userInfo: {
          nickname: userInfo.nickname,
          headimgurl: userInfo.headimgurl
        }
      });
    },
    config: {
      tags: ['api', GROUP_NAME],
      description: '微信公众号网页授权',
      auth: false,
      validate: {
        payload: {
          code: Joi.string().required()
        }
      }
    }
  }
];