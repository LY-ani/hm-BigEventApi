// 导入 Joi 来定义验证规则
const Joi = require('joi');
// 验证用户登录数据
const username = Joi.string().alphanum().min(1).max(10).required();
const password = Joi.string()
  .pattern(/^[\S]{6,12}$/)
  .required();
// 验证表单数据
const id = Joi.number().integer().min(1).required();
const nickname = Joi.string().required();
const email = Joi.string().email().required();
// 更新用户头像
// data:image/png:base64.VE9PTUFOWVNGQ1JFVFM=
const avatar = Joi.string().dataUri().required();
// 检验规则对象：登录
exports.reg_login_schema = {
  body: { username, password },
};
// 检验规则对象：更新用户信息
exports.update_userinfo_schema = {
  body: { id, nickname, email },
};
// 检验规则对象：重置密码
exports.update_password_schema = {
  body: {
    oldPwd: password,
    newPwd: Joi.not(Joi.ref('oldPwd')).concat(password),
  },
};
// 检验规则对象：更新用户头像
exports.update_avatar_schema = {
  body: { avatar },
};
