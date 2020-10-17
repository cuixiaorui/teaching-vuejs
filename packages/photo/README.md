# photo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 优化

#### nprogress 进度条

使用 nprogress 库在请求接口时给用户一个加载进度的友好提示

```
// 安装
npm i nprogress -S
// 使用
// 导入 css
import "nprogress/nprogress.css";
import nprogress from "nprogress";
// 开始
nprogress.start()
// 完成
nprogress.done()
```



#### 生成打包报告

使用 vue-cli 生成打包报告，优化项目的第一步，可以很明显的看到哪些文件 size 过大。

##### 采用命令方式生成

```js
yarn build --report
```

生成 report.html 文件，存放在 dist 文件夹下



##### 使用 vue-cli ui 

```
vue ui
```

打开可视化页面，可直接观察生成的 dist 文件夹

步骤：

	1. 执行 vue ui 打开页面
 	2. 点击任务
 	3. 点击 build
 	4. 点击 运行按钮
 	5. 点击右上角的分析按钮



#### 在生产坏境下删除 console.log 

使用 babel 插件： babel-plugin-transform-remove-console   

```js
// babel.config.js
// 判断是否为生产坏境
const isDev = process.env.NODE_ENV === "development";
const plugins = [];
if (!isDev) {
  // 只有是生产坏境下才添加 remove-console 插件
  plugins.push("transform-remove-console");
}
module.exports = {
  presets: ["@vue/cli-plugin-babel/preset"],
  plugins: [...plugins]
};
```



#### 路由懒加载

当有些页面不需要首屏渲染的话，可以通过路由懒加载技术异步加载组件，从而达到减小最终打包体积

```js
  {
    path: "/detail/:id",
    name: "Detail",
    props: true,
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  }
```

/* webpackChunkName: "detail" */ 是用于通知 webpack 的，打包之后会单独把这个组件打包到 detail 脚本内



#### 配置多入口 - 生产坏境和开发坏境入口

优化代码的时候，有可能会导致入口文件在生产环境和开发坏境有差异，所以可以通过下面的方式来实现

通过 chain 方式来操作 webpack config，改变 webpack 配置

```js
// vue.config.js
 chainWebpack: config => {
   // 判断是否为生产坏境
    config.when(process.env.NODE_ENV === "production", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main.prod.js");
    });
   // 判断是否为开发坏境
    config.when(process.env.NODE_ENV === "development", config => {
      config
        .entry("app")
        .clear()
        .add("./src/main.dev.js");
    });
```
#### 使用 externals 加载外部 CDN 资源 - 让依赖的第三方资源变更小
通过设置 webpack 的 externals 字段，可以不把配置的第三方库打包进去，从而减小打包后的体积
1. 配置 webpack的 externals
```js
// vue.config.js
chainWebpack: config => {
  // 只需要在 production 坏境下设置 
    config.when(process.env.NODE_ENV === "production", config => {
      // key 为 import 的包名
      // value 为 使用时的命名
      config.set("externals", {
        vue: "Vue"
      });
    });
```
2. 在 index.html 文件内引入对应的第三方库的 cdn 文件
```js
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.12"></script>
```
> 在 index.html 文件内导入的时候应该需要判断其坏境，只有在生产环境下才需要这么做
#### 自定义首页内容 - 通过修改 htmlplugin 的值来判断
基于坏境变量，来动态的处理 index.html 显示的内容
```js
// vue.config.js
chainWebpack: config => {
  
    config.when(process.env.NODE_ENV === "production", config => {
        config.plugin("html").tap(args => {
            args[0].isProd = true;
            return args;
        });
    });
  
    config.when(process.env.NODE_ENV === "development", config => {
      config.plugin("html").tap(args => {
        args[0].isProd = false;
        return args;
      });
    });
   }
```
在 index.html 模板内增加判断
```html
<% if(htmlWebpackPlugin.options.isProd === true) {%>
  	...具体代码
<% } %>
 
```
