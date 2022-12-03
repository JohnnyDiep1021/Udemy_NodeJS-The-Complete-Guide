/*
// sequelize will start this connect behind the scene
const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: `${process.env.DB_USER}`,
  database: `${process.env.DB_NAME}`,
  password: `${process.env.DB_PASSWORD}`,
});

module.exports = pool.promise();
*/
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  { host: `localhost`, dialect: `mysql` }
);

module.exports = sequelize;
