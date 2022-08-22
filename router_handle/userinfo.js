// 导入数据库模块
const db = require('../db/index');
const bcrypt = require('bcryptjs');
// 获取用户信息模块
const getUserInfo = (req, res) => {
  console.log(req);
  const getSql =
    'select id,username,nickname,email,user_pic from ev_users where id=?;';
  // req上的user属性是解析token时express-jwt自动挂载上去的
  // express-jwt 7 以上的版本，会挂载到req.auth而不是req.user
  db.query(getSql, req.auth.id, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('获取用户信息失败！');
    res.send({
      status: 0,
      message: '获取用户信息成功！',
      data: results[0],
    });
  });
};
// 更新用户信息模块
const updateUserInfo = (req, res) => {
  // console.log(req.body);
  // console.log(req.auth.id);
  // 如果只能修改登录账号的信息，需要设置where id=req.auth.id，再将schema导出的update_userinfo_schema中去掉id属性，不然会判断id为必须，导致id可以修改
  // 如果要能修改其他用户信息，需要设置where id=req.body.id，再在schema导出的update_userinfo_schema中添加id属性，这里的req.body.id与req.body里的id是一样的，查询那个id就修改那个id的用户信息，不是能修改id的意思，况且在schema校验中只校验id,nickname,email三个属性，username和password是不需要传进来的，就算传进来也修改不了，因为req.body没有username和password这两个属性
  const sql = 'update ev_users set ? where id=?;';
  db.query(sql, [req.body, req.body.id], (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('修改用户信息失败！');
    res.cc('修改用户信息成功！', 0);
  });
};
// 重置密码
const updatePassword = (req, res) => {
  const sql = `select * from ev_users where id=${req.auth.id}`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('用户不存在！');
    // 判断提交旧密码是否正确
    const compareResult = bcrypt.compareSync(
      req.body.oldPwd,
      results[0].password
    );
    if (!compareResult) return res.cc('旧密码错误！');
    // 对新密码进行加密
    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);
    const sql = `update ev_users set password='${newPwd}' where id=${req.auth.id};`;
    db.query(sql, (err1, results1) => {
      if (err1) return res.cc(err1);
      if (results1.affectedRows !== 1) return res.cc('更新密码失败！');
      res.cc('更新密码成功！', 0);
    });
  });
};
// 更新用户头像
const updateAvatar = (req, res) => {
  const sql = `update ev_users set user_pic='${req.body.avatar}' where id=${req.auth.id};`;
  db.query(sql, (err, results) => {
    if (err) return res.cc(err);
    if (results.affectedRows !== 1) return res.cc('更新头像失败！');
    res.cc('更新头像成功！', 0);
  });
};
module.exports = {
  getUserInfo,
  updateUserInfo,
  updatePassword,
  updateAvatar,
};
