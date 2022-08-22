// 导入定义验证规则的模块
const Joi = require('joi');

// 定义 标题、分类Id、内容、发布状态 的验证规则
const title = Joi.string().required();
const cate_id = Joi.number().integer().min(1).required();
const content = Joi.string().required().allow('');
const state = Joi.string().valid('已发布', '草稿').required();

// 搜索验证规则
const title1 = Joi.string();
const cate_id1 = Joi.number().integer().min(1);
const content1 = Joi.string().allow('');
const state1 = Joi.string().valid('已发布', '草稿');
const author_id1 = Joi.number();
const author1 = Joi.string();

// 修改文章 传文章id
const id = Joi.number().integer().required();

// 验证规则对象 - 发布文章
exports.add_article_schema = {
  body: {
    title,
    cate_id,
    content,
    state,
  },
};

// 验证规则对象 - 搜索文章
exports.search_article_schema = {
  body: {
    title: title1,
    cate_id: cate_id1,
    content: content1,
    state: state1,
    author_id: author_id1,
    author: author1,
  },
};

// 验证规则对象 - 修改文章
exports.edit_article_schema = {
  body: {
    id,
    title,
    cate_id,
    content,
    state,
  },
};

// 验证规则对象 - 删除文章
exports.delete_article_schema = {
  query: { id },
};
