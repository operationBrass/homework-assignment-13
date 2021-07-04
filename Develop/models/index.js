// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');

// Categories have many Products
// Products belongsTo Category
Product.belongsTo(Category);
Category.hasMany(Product,{constraints:false});

// Products belongToMany Tags (through ProductTag)
// Tags belongToMany Products (through ProductTag)
Product.belongsToMany(Tag,{through: 'product_tag'});
Tag.belongsToMany(Product,{through: 'product_tag'});

module.exports = {
  Product,
  Category,
  Tag,
};
