const { DataTypes, Model } = require('sequelize');
const bcrypt = require('bcrypt');
const db = require('../db');

class User extends Model {
  static async hash(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
    },
    salt: {
      type: DataTypes.STRING,
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: db,
    modelName: 'user',
  },
);

User.beforeCreate(async (user) => {
  try {
    const salt = await bcrypt.genSalt(16);
    user.setDataValue('salt', salt); // Set salt using Sequelize's method
    const hash = await user.hash(user.password, salt); // Use user.hash() instead of this.hash()
    user.setDataValue('password', hash); // Set password using Sequelize's method
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = User;
