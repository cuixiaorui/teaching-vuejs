import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      requireAuth: true
    }
  },

  {
    path: "/login",
    name: "Login",
    component: Login
  },
  {
    path: "/detail/:id",
    name: "Detail",
    props: true,
    component: () =>
      import(/* webpackChunkName: "detail" */ "../views/Detail.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

// 通过路由守卫
router.beforeEach((to, from, next) => {
  // 嵌套路由要怎么办呢
  to.matched.forEach(route => {
    if (route.meta.requireAuth === true) {
      // 看看有没有 token
      const token = store.state.token;
      if (token) {
        next();
        return;
      } else {
        // 没有 token 的话，那么直接到 login 页面即可
        next({
          name: "Login"
        });
        return;
      }
    }
  });

  next();
});

export default router;
