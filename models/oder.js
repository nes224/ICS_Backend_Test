'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class oder extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  oder.init({
    orderCount: DataTypes.STRING,
    orderStatus: DataTypes.STRING,
    paid_date: DataTypes.DATE,
    notPaid_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'oder',
  });
  return oder;
};