const router = require('express').Router();
const userController = require('../../controllers/user');

//use routers
router.get('/list', userController.list);
router.get('/listQueryResult', userController.listQueryResult);
router.get('/userList', userController.userList);

router.post('/add', userController.add);
router.post('/addBulk', userController.addBulk);

router.put('/update', userController.update);

module.exports = router;