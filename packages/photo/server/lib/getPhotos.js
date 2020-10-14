const { getDB } = require("./db");
const PER_SIZE = 10;
module.exports = async (ctx) => {
  const uId = ctx.state.user.uId;
  let { p: currentPage } = ctx.query;

  console.log(currentPage);
  if (!currentPage) {
    currentPage = 1;
  }

  const offset = (currentPage - 1) * PER_SIZE;
  const limit = PER_SIZE;
  console.log(offset, limit);
  const sql = `SELECT * FROM photos WHERE uId=? LIMIT ?,?`;
  const [rows] = await getDB().execute(sql, [uId, offset, limit]);

  const pageInfo = await getPageInfo(uId, currentPage);

  ctx.body = {
    state: 1,
    data: {
      photos: [...rows],
      page: pageInfo,
    },
  };
};

async function getPageInfo(uId, currentPage) {
  const sql = `SELECT * FROM photos WHERE uId=? `;
  const [rows] = await getDB().execute(sql, [uId]);
  return {
    prepage: PER_SIZE,
    page: Number(currentPage),
    total: rows.length,
  };
}
