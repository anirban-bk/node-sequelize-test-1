'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  const roleModel = require('./role')(sequelize, DataTypes);
  const photoModel = require('./photo')(sequelize, DataTypes);
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  user.init({
    name: {type: DataTypes.STRING, allowNull: false},
    email:{type: DataTypes.STRING, allowNull: false} ,
    role_id:{type: DataTypes.INTEGER, allowNull: true}
  }, {
    sequelize,
    modelName: 'user',
  });

  user.belongsTo(roleModel,{
    foreignKey: 'role_id',
    targetKey: 'id',
    as: 'rm'
  });

  user.hasMany(photoModel,{
    foreignKey: 'user_id',
    targetKey: 'id',
    as: 'pm'
  });

  /* user.list = ()=>{
    return new Promise(async (resolve, reject)=>{
        let data = await user.findAll({
          attributes: ["id", "name", "email", "role_id"],
          include: [{
              model: roleModel,
              attributes: ["name", "id"]  
          }]
        });
        resolve(data);
    })
  }; */
  user.list = ()=>{
    return new Promise(async (resolve, reject)=>{
        let data = await user.findAll({
          attributes: ["id", "name", "email", "role_id", [sequelize.col('rm.name'), 'role_name']],
          include: [
            {
              model: roleModel,
              as: 'rm',
              attributes: ["name", "id"]  
            },
            {
              model: photoModel,
              as: 'pm',
              attributes: ["user_id", "id"]  
            }
          ]
        });
        resolve(data);
    })
  };



  return user;
};