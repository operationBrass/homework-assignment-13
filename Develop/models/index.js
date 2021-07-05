// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag')

// Categories have many Products
// Products belongsTo Category
Category.hasMany(Product);
Product.belongsTo(Category,{constraints:false});

// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  through: ProductTag,
  onDelete: 'CASCADE',
});

// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  through: ProductTag,
  onDelete: 'CASCADE',
});

module.exports = {
  Product,
  ProductTag,
  Category,
  Tag,
};
