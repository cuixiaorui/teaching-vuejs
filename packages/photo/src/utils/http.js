import axios from "axios";
import Vue from "vue";
import router from "../router";
import store from "../store";
import nprogress from "nprogress";

// 区分坏境
// process.env.NODE_ENV

const myAxios = axios.create({
  timeout: 8000,
  baseURL:
    process.env.NODE_ENV === "development" ? "/api" : "http://localhost:8081/"
});

// 请求拦截器
myAxios.interceptors.request.use(config => {
  // 设置 token
  // jwt
  const token = store.state.token;
  if (token) {
    config.headers.authorization = "Bearer " + token;
  }

  // 显示进度条
  nprogress.start();

  return config;
});

// 响应拦截器
myAxios.interceptors.response.use(
  res => {
    if (res.data.state === 0) {
      // 错误
      // 打印 msg
      Vue.prototype.$message({
        type: "error",
        message: res.data.msg
      });
    }

    // 隐藏进度条
    nprogress.done();
    return res.data;
  },
  e => {
    const { status } = e.response;

    if (status === 401) {
      // 权限问题
      // 调整到登录页面
      //   console.log(Vue.prototype);
      //   Vue.prototype.$router.replace({
      //     name: "Login"
      //   });
      // 给一些提示啊
      router.replace({
        name: "Login"
      });
    }
  }
);

export default myAxios;
