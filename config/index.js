const { env } = process;

const config = {
  host: env.HOST,
  port: env.PORT,
  jwtSecret: env.JWT_SECRET,
  wxAppid: env.WX_APPID,
  wxAppsecret: env.WX_APPSECRET
};

module.exports = config;