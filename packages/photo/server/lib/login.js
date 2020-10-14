const jsonwebtoken = require("jsonwebtoken");
const {SECRET} = require('./config');
const { getDB } = require("../lib/db");
module.exports = async (ctx) => {
  const { username, password } = ctx.request.body;
  const sql = `SELECT * FROM users WHERE username=? AND password=?`;
  const [row] = await getDB().execute(sql, [username, password]);
  const userInfo = row[0]
  if (userInfo) {
    //登录成功
    const token = jsonwebtoken.sign({ uId: userInfo.id }, SECRET, {
      expiresIn: "2h",
    });
    ctx.body = {
      state: 1,
      msg: "登录成功",
      data: {
        token,
      },
    };
  } else {
    //登录失败
    ctx.body = {
      state: 0,
      msg: "登录失败",
    };
  }
};
