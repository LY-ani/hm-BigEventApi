const express = require('express');
// express的路由模块
const router = express.Router();
const { regUser, login } = require('../router_handle/user');

// 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi');
const { reg_login_schema } = require('../schema/user');

// 注册新用户
router.post('/reguser', expressJoi(reg_login_schema), regUser);
// 登录
router.post('/login', expressJoi(reg_login_schema), login);

// 导出
module.exports = router;
