const {Sequelize, Model, DataTypes} = require('sequelize');

let dbConfig = {
    db_name: 'about_seq',
    db_user: 'root',
    db_pass: '',
    con_type: 'mysql',
    port: '3306',
    host: 'localhost'
}

const sequelizeTZ = new Sequelize(dbConfig.db_name, dbConfig.db_user, dbConfig.db_pass, {
    host: dbConfig.host,
    dialect: dbConfig.con_type,
    port: dbConfig.port
})

const connection = {};

connection.Sequelize = Sequelize;
connection.sequelizeTZ = sequelizeTZ;
connection.Model = Model;
connection.DataTypes = DataTypes;

module.exports = connection;