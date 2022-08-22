// 用户信息
const express = require('express');
const router = express.Router();

// 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi');
const {
  update_userinfo_schema,
  update_password_schema,
  update_avatar_schema,
} = require('../schema/user');

const {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateAvatar,
} = require('../router_handle/userinfo');
// 获取用户信息模块
router.get('/userinfo', getUserInfo);
// 更新用户模块
router.post('/userinfo', expressJoi(update_userinfo_schema), updateUserInfo);
// 重置密码
router.post('/updatepwd', expressJoi(update_password_schema), updatePassword);
// 更新用户头像
router.post('/update/avatar', expressJoi(update_avatar_schema), updateAvatar);
module.exports = router;
