// 导入数据库模块
const db = require('../db/index');
// 导入加密模块
const bcrypt = require('bcryptjs');
// 导入生成token字符串的包
const jwt = require('jsonwebtoken');
const config = require('../config');
// 注册用户的函数处理
regUser = (req, res) => {
  const userData = req.body;
  // console.log(userData);
  // 判断用户数据是否合法
  // 使用第三方成中间件校验用户合法性
  // if (!userData.username || !userData.password) {
  //   // return res.send({ status: 1, message: '用户名或密码不合法' });
  //   return res.cc('用户名或密码不合法');
  // }
  const search = `select * from ev_users where username='${userData.username}';`;
  db.query(search, (err, results) => {
    // 语句查询出错
    if (err) {
      // return res.send({ status: 1, message: err.message });
      return res.cc(err);
    }
    // 用户名被占用
    if (results.length > 0) {
      // return res.send({ status: 1, message: '用户名被占用，请更换其他用户名！' });
      return res.cc('用户名被占用，请更换其他用户名！');
    }
    // 调用bcrypt.hashSync()对密码进行加密
    userData.password = bcrypt.hashSync(userData.password, 10);
    // 插入新用户
    const insert = `insert into ev_users set ?;`;
    db.query(
      insert,
      { username: userData.username, password: userData.password },
      (err, results) => {
        if (err) {
          // return res.send({ status: 1, message: err.message });
          return res.cc(err);
        }
        console.log(results);
        if (results.affectedRows !== 1) {
          // return res.send({ status: 1, message: '注册用户失败，请稍后再试！' });
          return res.cc('注册用户失败，请稍后再试！');
        }
        // 注册用户成功
        // res.send({ status: 1, message: '注册成功！' });
        res.cc('注册成功！', 0);
      }
    );
  });

  // res.send('reg ok');
};

// 登录处理函数
login = (req, res) => {
  const userData = req.body;
  const search = `select * from ev_users where username='${userData.username}';`;
  db.query(search, (err, results) => {
    // 语句查询出错
    if (err) return res.cc(err);
    if (results.length !== 1) return res.cc('登录失败');
    // 判断密码是否正确
    const compareResult = bcrypt.compareSync(
      userData.password,
      results[0].password
    );
    if (!compareResult) return res.cc('登录失败！');
    // 搞token 密码，用户头像这些信息要剔除（用户头像怕他太大了）
    const user = { ...results[0], password: '', user_pic: '' };
    // 生成token字符串
    const tokenStr = jwt.sign(user, config.jetSecretKey, {
      expiresIn: config.expiresIn,
    });
    // console.log('req.user', req.user);
    // console.log('res.user', res.user);
    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + tokenStr,
    });
  });
};

// 导出
module.exports = {
  regUser,
  login,
};
