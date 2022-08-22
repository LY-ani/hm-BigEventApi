const path = require('path');
const db = require('../db/index');
const addArticle = (req, res) => {
  // console.log('req.body', req.body); // 文本类型的数据
  // console.log('--------分割线----------');
  // console.log('req.file', req.file); // 文件类型的数据

  // 手动判断是否上传了文章封面
  if (!req.file || req.file.fieldname !== 'cover_img') {
    return res.cc('文章封面是必选参数！');
  }
  const articleInfo = {
    // 标题、内容、状态、所属的分类Id
    ...req.body,
    // 文章封面在服务器端的存放路径
    cover_img: path.join('/uploads', req.file.filename),
    // 文章发布时间
    pub_date: new Date(),
    // 文章作者的Id
    author_id: req.auth.id,
    // 文章作者用户名
    author: req.auth.username,
  };
  const sql = `insert into ev_articles set ?`;
  db.query(sql, articleInfo, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('发布文章失败！');
    res.cc('发布文章成功', 0);
  });
};

// 搜索文章
const searchArticle = (req, res) => {
  let sql = 'select * from ev_articles where is_delete=0';
  // 模糊查询 标题 内容 作者名字
  if (req.body.title) sql += ` and title like '%${req.body.title}%'`;
  if (req.body.content) sql += ` and content like '%${req.body.content}%'`;
  if (req.body.author) sql += ` and author like '%${req.body.author}%'`;
  // 精准查询 分类id 发布状态 作者id
  if (req.body.cate_id) sql += ` and cate_id=${req.body.cate_id}`;
  if (req.body.state) sql += ` and state='${req.body.state}'`;
  if (req.body.author_id) sql += ` and author_id=${req.body.author_id}`;
  // console.log('search sql', sql);
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length === 0) return res.cc('未查询到文章！');
    res.send(results);
  });
};
// 修改文章
const editArticle = (req, res) => {
  let sql = `select * from ev_articles where id=${req.body.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('文章编号出错！');
    // 手动判断是否上传了文章封面
    if (!req.file || req.file.fieldname !== 'cover_img') {
      return res.cc('文章封面是必选参数！');
    }
    const articleInfo = {
      // 标题、内容、状态、所属的分类Id
      ...req.body,
      // 文章封面在服务器端的存放路径
      cover_img: path.join('/uploads', req.file.filename),
      // 文章发布时间
      pub_date: new Date(),
      // 文章作者的Id
      author_id: req.auth.id,
      // 文章作者用户名
      author: req.auth.username,
    };
    const sql = `update ev_articles set ? where id=${req.body.id}`;
    db.query(sql, articleInfo, (err, results) => {
      if (err) return res.cc(err);
      if (results.affectedRows !== 1) return res.cc('修改文章失败！');
      res.cc('修改文章成功', 0);
    });
  });
};
// 删除文章
const deleteArticle = (req, res) => {
  const sql = `update ev_articles set is_delete=1 where id=${req.query.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('删除文章失败！');
    res.cc('删除文章成功', 0);
  });
};

module.exports = {
  addArticle,
  searchArticle,
  editArticle,
  deleteArticle,
};
