const Cart = require("./cart");
const { Sequelize, DataTypes } = require(`sequelize`);
const sequelize = require("../util/database");

const Product = sequelize.define("product", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DOUBLE,
    allowNull: false,
  },
});
module.exports = Product;

/*
LEGACY CODE
module.exports = class Product {
  constructor(id, title, imageUrl, description, price) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
  }

  save() {
    return db.execute(
      // avoid SQL injection
      `INSERT INTO products (title, price, imageUrl, description) VALUES (?, ?, ?, ?)`,
      [this.title, this.price, this.imageUrl, this.description]
    );
  }

  static deleteById(id) {}

  static fetchAll(cb) {
    return db.execute(`SELECT * FROM products`);
  }

  static findById(id) {
    return db.execute(`SELECT * FROM products AS P WHERE P.id = ?`, [id]);
  }
};
*/
