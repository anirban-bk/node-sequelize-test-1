//const userModel = require('../models/user');
const db = require('../models/index');
const { use } = require('../routes/routes/user');

//db.userModel
const userModel = require('../models/user')(db.sequelize, db.DataTypes);
const roleModel = require('../models/role')(db.sequelize, db.DataTypes);



const list = async (req, res)=>{
    //let result = await userModel.findAll({});
    let result = await userModel.findAll({
        /* attributes:["id", "name", ["email", "email_ID"]] */
        attributes: {
            exclude:['createdAt', 'updatedAt'],
            include: [
                [db.sequelize.fn('CONCAT', db.sequelize.col('name'), ' Singh'), 'full name']
            ]
        },where:{
            id: {[db.Sequelize.Op.gte]:3},
            name: {[db.Sequelize.Op.like]: '%n%'}
        },
        order:[
            ["name", "DESC"]/* ,
            ["email", "ASC"] */
        ],
        limit:7 ,
        offset:1,
        group: ['email', 'name']
         /* ,where:{"name": "merlin britto"} */

    }); 
    res.status(200).json(result);
}

const userList = async (req, res)=>{
    let result = await userModel.list();
    res.status(200).json(result);
    /* let result = await userModel.findAll({
        attributes: ["id", "name", "email", "role_id"],
        include: {
            model: roleModel,
            attributes: ["name"]
        }
    }); */
}

const listQueryResult = async (req, res)=>{
        /* let result = await db.sequelize.query("select * from users where name=:name",{
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: {name: 'Ram Singh'}
        }); */
        let result = await db.sequelize.query("select * from users where name= ? AND email= ?",{
            type: db.Sequelize.QueryTypes.SELECT,
            replacements: ['merlin britto', 'ram12@xyz.com']
        });
        res.status(200).json(result)
}

const add = async (req, res)=>{
    let user = await userModel.create(req.body).then(async data=>await res.status(200).send(data), async error=>await res.status(400).send(error.errors));
}

const update = async (req, res)=>{
    let updateObj = {};
    let userID = req.body.id;
    for(const [key, value] of Object.entries(req.body)){
        if(key.toString().toLowerCase()!=='id'){
            updateObj[key] = value;
        }
    }
    let user = await userModel.update(updateObj, {where:{id: userID}}).then(async rowUpdatedData=>{         
         if(rowUpdatedData[0]>=1){
            await res.status(200).send({
            message: `user with id ${userID} updated`,
            responseData: rowUpdatedData
        })
        }else if(rowUpdatedData[0]===0){
            await res.status(200).send({
                message: `user with id ${userID} doesn't exists`,
                responseData: rowUpdatedData
            })
        }
        //await res.status(200).send(data)
    }, async error => await res.status(400).send(error.errors)
    
    )
}

const addBulk = async (req, res)=>{
    let bulkData = req.body;
    let users = await userModel.bulkCreate(bulkData, 
            {returning: true, updateOnDuplicate: ["name", "email"]}
            ).then(async data=> await res.status(200).json(data), async error=> await res.status(400).send(error.errors)); 
}

module.exports = {list, listQueryResult, userList, add, update, addBulk}