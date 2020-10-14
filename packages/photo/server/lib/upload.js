const fs = require("fs");
const path = require("path");
const db = require("./db");
module.exports = async ctx => {
  // 保存图片到本地
  const { img } = ctx.request.files;
  const uploadPath = generateUploadPath(img.name);
  saveImgToUpload(img, uploadPath);
  // 保存到db
  const [rows] = await insertToDB({
    imgUrl: generateToDbUploadPath(uploadPath),
    name: img.name,
    uId: ctx.state.user.uId
    // uId: 2,
  });

  if (rows.affectedRows === 1) {
    ctx.body = "上传成功";
  } else {
    ctx.body = "上传失败";
  }
};

async function insertToDB({ imgUrl, name, uId }) {
  const sql = `INSERT INTO photos (id,imgUrl,name,uId) VALUES  (0,?,?,?)`;
  return await db.getDB().execute(sql, [imgUrl, name, uId]);
}

function generateToDbUploadPath(path) {
  return "http://localhost:8081" + path;
}

function generateUploadPath(name) {
  return "/upload/" + createImgName(name);
}

function createImgName(name) {
  return Date.now() + "_" + name;
}

function saveImgToUpload(img, uploadPath) {
  const readStream = fs.createReadStream(img.path);
  const savePath = path.join(__dirname, "../static", uploadPath);
  const writeStream = fs.createWriteStream(savePath);
  readStream.pipe(writeStream);
}
