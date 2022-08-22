// 导入 express
const express = require('express');
// 创建路由对象
const router = express.Router();

// 导入解析 formdata 格式表单数据的包
const multer = require('multer');
// 导入处理路径的核心模块
const path = require('path');

// 创建 multer 的实例对象，通过 dest 属性指定文件的存放路径
const upload = multer({ dest: path.join(__dirname, '../uploads') });
// 导入验证数据的中间件
const expressJoi = require('@escook/express-joi');
// 导入需要的验证规则对象
const {
  add_article_schema,
  search_article_schema,
  edit_article_schema,
  delete_article_schema,
} = require('../schema/article');

const {
  addArticle,
  searchArticle,
  editArticle,
  deleteArticle,
} = require('../router_handle/article');

// 发布新文章
router.post(
  '/add',
  upload.single('cover_img'),
  expressJoi(add_article_schema),
  addArticle
);

// 查询文章
router.post('/search', expressJoi(search_article_schema), searchArticle);

// 修改文章
router.post(
  '/edit',
  upload.single('cover_img'),
  expressJoi(edit_article_schema),
  editArticle
);

// 删除文章
router.get('/delete', expressJoi(delete_article_schema), deleteArticle);

module.exports = router;
