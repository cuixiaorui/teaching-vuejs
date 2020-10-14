const Koa = require("koa");
const serve = require("koa-static");
const koaBody = require("koa-body");
const Router = require("koa-router");
const upload = require("./lib/upload");
const login = require("./lib/login");
const getPhotos = require("./lib/getPhotos");
const getPhoto = require("./lib/getPhoto");
const db = require("./lib/db");
const koaJwt = require("koa-jwt");
const { SECRET } = require("./lib/config");

db.initDB();

const app = new Koa();
app.use(
  koaBody({
    multipart: true
  })
);
app.use(serve(__dirname + "/static"));
app.use(koaJwt({ secret: SECRET }).unless({ path: [/^\/login/] }));

const router = new Router();

router.post("/upload", upload);
router.post("/login", login);
router.get("/getPhotos", getPhotos);
router.get("/getPhoto", getPhoto);

app.use(router.routes());
app.listen(8081);
