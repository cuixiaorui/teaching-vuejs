const Koa = require("koa");

const app = new Koa();

app.use((ctx) => {
  ctx.body = "123";
});

app.listen(8082);
