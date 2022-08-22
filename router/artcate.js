// 文章分类
const express = require('express');
const router = express.Router();

// 导入 @escook/express-joi
const expressJoi = require('@escook/express-joi');
const {
  add_cate_schema,
  delete_cate_schema,
  get_cate_schema,
  update_cate_schema,
} = require('../schema/artcate');

const {
  getArticleCates,
  addArticleCates,
  deleteCateById,
  getArtCateById,
  updateCateById,
} = require('../router_handle/artcate');

// 获取文章分类列表路由
router.get('/cates', getArticleCates);
// 新增文章分类路由
router.post('/addcates', expressJoi(add_cate_schema), addArticleCates);
// 删除文章分类路由
router.get('/deletecate/:id', expressJoi(delete_cate_schema), deleteCateById);
// 根据id获取文章分类
router.get('/cates/:id', expressJoi(get_cate_schema), getArtCateById);
// 更新文章分类路由
router.post('/updatecate', expressJoi(update_cate_schema), updateCateById);

module.exports = router;
