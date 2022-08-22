const db = require('../db/index');

// 获取文章分类列表数据
const getArticleCates = (req, res) => {
  const sql =
    'select * from ev_article_cate where is_delete=0 order by id asc;';
  db.query(sql, (err, result) => {
    if (err) return res.cc(err);
    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: result,
    });
  });
};
// 新增文章分类列表
const addArticleCates = (req, res) => {
  // 查询分类名称和分类别名
  const sql = `select * from ev_article_cate where name=? or alias=?;`;
  db.query(sql, [req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);
    // 分类名称和分类别名都被占用
    if (results.length === 2) {
      return res.cc('分类名称和分类别名都被占用，请更换后重试!');
    }
    if (
      results.length === 1 &&
      results[0].name === req.body.name &&
      results[0].alias === req.body.alias
    ) {
      return res.cc('分类名称和分类别名都被占用，请更换后重试!');
    }
    if (results.length === 1 && results[0].name === req.body.name) {
      return res.cc('分类名称被占用，请更换后重试!');
    }
    if (results.length === 1 && results[0].alias === req.body.alias) {
      return res.cc('分类别名被占用，请更换后重试!');
    }
    const sql = 'insert into ev_article_cate set ?;';
    db.query(sql, req.body, (err1, results1) => {
      if (err1) return res.cc(err1);
      if (results1.affectedRows !== 1) return res.cc('新增文章分类失败！');
      res.cc('新增文章分类成功！', 0);
    });
  });
};
// 删除文章分类
const deleteCateById = (req, res) => {
  const sql = `update ev_article_cate set is_delete=1 where id=${req.params.id};`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('删除文章分类失败！');
    res.cc('删除文章分类成功！', 0);
  });
};
// 根据id获取文章分类
const getArtCateById = (req, res) => {
  const sql = `select * from ev_article_cate where is_delete=0 and id=${req.params.id};`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('获取文章分类失败！');
    res.send({
      status: 0,
      message: '获取文章分类成功！',
      data: results[0],
    });
  });
};
// 更新文章分类
const updateCateById = (req, res) => {
  // 先查询分类名称和别名有没有被占用
  const sql =
    'select * from ev_article_cate where id<>? and (name=? or alias=?);';
  db.query(
    sql,
    [req.body.Id, req.body.name, req.body.alias],
    (err, results) => {
      if (err) return res.cc(err);
      // 分类名称和分类别名都被占用
      if (results.length === 2) {
        return res.cc('分类名称和分类别名都被占用，请更换后重试!');
      }
      if (
        results.length === 1 &&
        results[0].name === req.body.name &&
        results[0].alias === req.body.alias
      ) {
        return res.cc('分类名称和分类别名都被占用，请更换后重试!');
      }
      if (results.length === 1 && results[0].name === req.body.name) {
        return res.cc('分类名称被占用，请更换后重试!');
      }
      if (results.length === 1 && results[0].alias === req.body.alias) {
        return res.cc('分类别名被占用，请更换后重试!');
      }
      const sql = 'update ev_article_cate set ? where id=?;';
      db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err) return res.cc(err);
        if (results.affectedRows !== 1) return res.cc('更新文章分类失败！');
        res.cc('更新文章分类成功！', 0);
      });
    }
  );
};

module.exports = {
  getArticleCates,
  addArticleCates,
  deleteCateById,
  getArtCateById,
  updateCateById,
};
