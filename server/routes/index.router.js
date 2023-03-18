const express = require('express');
const router = express.Router();
const jwtHelper = require('../config/jwtHelper');
const ctrlUser = require('../controllers/user.controller');
const ctrlTask = require('../controllers/task.controller');

router.post('/register', ctrlUser.register);
router.post('/login', ctrlUser.login);
router.get('/user',jwtHelper.verifyJwtToken, ctrlUser.user);
router.post('/task/add', ctrlTask.add);
router.get('/fetchAllArchitect', ctrlTask.fetchAllArchitect);
router.get('/task/findMyTask/:id/:role', ctrlTask.findMyTask);
router.get('/task/getTask/:id', ctrlTask.getTask);
router.post('/task/edit', ctrlTask.edit);
router.delete('/task/delete/:id', ctrlTask.delete);


module.exports = router;



