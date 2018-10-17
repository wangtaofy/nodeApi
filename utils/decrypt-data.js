// 封装的 decryptData，用于解码小程序的 encryptData
const crypto = require('crypto')

const decryptData = (encryptedData, iv, sessionKey, appId) => {
  // base64 decode
  var sessionKey = new Buffer(sessionKey, 'base64')
  encryptedData = new Buffer(encryptedData, 'base64')
  iv = new Buffer(iv, 'base64')

  try {
     // 解密
    var decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv)
    // 设置自动 padding 为 true，删除填充补位
    decipher.setAutoPadding(true)
    var decoded = decipher.update(encryptedData, 'binary', 'utf8')
    decoded += decipher.final('utf8')
    
    decoded = JSON.parse(decoded)

  } catch (err) {
    throw new Error('Illegal Buffer')
  }

  if (decoded.watermark.appid !== appId) {
    throw new Error('Illegal Buffer')
  }

  return decoded
}

module.exports = decryptData;