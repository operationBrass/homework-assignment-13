// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    // define columns
    id:{
      type: DataTypes.INTEGER,
      primaryKey:true,
      allowNull:false,
      autoIncrement:true,
    },
      product_name: {
          type: DataTypes.STRING(30),
          allowNull:false,
        },
      price: {
          type: DataTypes.DECIMAL,
          allowNull:false,
        },
        stock: {
          type: DataTypes.INTEGER,
          allowNull:false,
          defaultValue:10,
        },
    },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
