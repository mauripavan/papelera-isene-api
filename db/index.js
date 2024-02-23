const Sequelize = require('sequelize');
// const config = require('./config/config');

const sequelize = new Sequelize(
  'postgres://mauricio:Lvm2CV534Jz54SrrATRjzPisST1s80Ra@dpg-cncf4i2cn0vc73f1ffhg-a/papeleradb?ssl=true',
);

module.exports = sequelize;
