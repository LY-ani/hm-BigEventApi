const Joi = require('joi');

// 定义分类名称和分类别名的校验规则
const name = Joi.string().required();
const alias = Joi.string().alphanum().required();
// 定义分类id
const id = Joi.number().min(1).required();

// 校验规则对象 - 添加分类
exports.add_cate_schema = {
  body: { name, alias },
};
// 校验规则对象 - 删除分类
exports.delete_cate_schema = {
  params: { id },
};
// 校验规则对象 - 根据id获取分类
exports.get_cate_schema = {
  params: { id },
};
// 校验规则对象 - 更新分类
exports.update_cate_schema = {
  body: { id, name, alias },
};
