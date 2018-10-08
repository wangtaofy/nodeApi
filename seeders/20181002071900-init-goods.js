'use strict';

const timestamps = {
  created_at: new Date(),
  updated_at: new Date()
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('Person', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    return queryInterface.bulkInsert(
      'goods',
      [
        {
          id: 1,
          shop_id: 1,
          name: '湾仔码头 速冻水饺 蟹皇饺 360g 23只 火锅食材',
          thumb_url: 'https://img14.360buyimg.com//n0/jfs/t9934/82/972122399/157538/efd99906/59daf409N7fe8d5fb.jpg',
          ...timestamps
        },
        {
          id: 2,
          shop_id: 2,
          name: '康师傅黑胡椒牛排面白胡椒肉骨面方便面20袋整箱泡面速食面黑白混搭方便零食品加班夜宵 2口味混搭',
          thumb_url: 'https://img13.360buyimg.com//n0/jfs/t7153/181/34430325/398610/be8d7396/597b58a4N7b690abf.jpg',
          ...timestamps
        },
        {
          id: 3,
          shop_id: 3,
          name: '海底捞番茄小酥肉自煮火锅套餐415g 自热式懒人自煮方便火锅网红麻辣烫',
          thumb_url: 'https://img13.360buyimg.com//n0/jfs/t21766/349/1077704641/242893/fc911b4a/5b1fc0e1N2b247931.jpg',
          ...timestamps
        },
        {
          id: 4,
          shop_id: 4,
          name: '雅仕潮品长袖条纹T恤女纯棉2018春秋季新款女装韩版修身一字领打底衫 白色条纹（长袖） XL',
          thumb_url: 'https://img14.360buyimg.com/n1/s800x1026_jfs/t25213/62/387346126/102884/133e574f/5b7b8af1N0a3f0fd5.jpg!cc_800x1026.jpg',
          ...timestamps
        },
        {
          id: 5,
          shop_id: 5,
          name: '紫伶语 长袖T恤女宽松秋装2018新款纯棉打底衫女韩版小衫体恤妈妈上衣服 驼色 XL',
          thumb_url: 'https://img12.360buyimg.com/n1/s800x1026_jfs/t23359/43/1956982730/83334/e8448b14/5b6e7fefNace8388e.jpg!cc_800x1026.jpg',
          ...timestamps
        },
        {
          id: 6,
          shop_id: 6,
          name: '意尔康男鞋透气舒适运动休闲鞋潮流时尚白底单鞋 7112ZR97490W 灰色 41',
          thumb_url: 'https://img11.360buyimg.com/n1/jfs/t17557/297/249668579/57886/35e0fe44/5a66e778Nc9bd785f.jpg',
          ...timestamps
        },
      ],
      {}
    )
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    const { Op } = Sequelize;

    return queryInterface.bulkInsert(
      'goods',
      {
        id: {
          [Op.in]: [1, 2, 3, 4, 5]
        }
      },
      {}
    )
  }
};
