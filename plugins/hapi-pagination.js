const hapiPagination = require('hapi-pagination');

const options = {
  query: {
    // 入参配置代码
  },
  meta: {
    name: 'meta',
    // meta 相关配置代码
  },
  results: {
    name: 'results'
  },
  reply: {
    paginate: 'paginate'
  },
  routes: {
    include: [
      '/shops',
      '/shops/{shopId}/goods'
    ],
    exclude: []
  }
}

module.exports = {
  register: hapiPagination,
  options: options,
}
