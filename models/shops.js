// 店铺表
module.exports = (sequelize, DataTypes) => sequelize.define(
  'shops',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumb_url: DataTypes.STRING,
    address: DataTypes.STRING
  },
  {
    tableName: 'shops'
  }
);