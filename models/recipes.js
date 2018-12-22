// 食谱表
module.exports = (sequelize, DataTypes) => sequelize.define(
  'recipes',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    cooking_time: DataTypes.STRING,
    prep_time: DataTypes.STRING,
    serves: DataTypes.INTEGER,
    cuisine: DataTypes.STRING,
    ingredients: DataTypes.TEXT,
    directions: DataTypes.TEXT,
    stars: {
      type: DataTypes.INTEGER,
      default: 0
    },
    user_id: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    tableName: 'recipes',
    timestamps: false
  }
);