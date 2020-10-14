import Vue from "vue";
import Vuex from "vuex";
import { fetchLogin, fetchPhotos } from "@/api";
import router from "../router";

Vue.use(Vuex);

const types = {
  LOGIN: "login",
  UPDATE_PHOTOS: "updatePhotos",
  UPDATE_PAGE: "updatePage"
};

export default new Vuex.Store({
  state: {
    token: localStorage.getItem("token") || "",
    photos: [],
    pageSize: 0,
    pageTotal: 0
  },

  getters: {
    getPhotoItemById(state) {
      return id => {
        return state.photos.find(photo => {
          return photo.id === id;
        });
      };
    }
  },

  mutations: {
    [types.LOGIN](state, { token }) {
      state.token = token;
      // 保存到
      localStorage.setItem("token", token);
    },
    [types.UPDATE_PHOTOS](state, { photos }) {
      state.photos = photos;
    },
    [types.UPDATE_PAGE](state, payload) {
      console.log(payload);
      state.pageSize = payload.prepage;
      state.pageTotal = payload.total;
    }
  },
  actions: {
    login({ commit }, payload) {
      const { username, password } = payload;
      fetchLogin({ username, password }).then(res => {
        if (res.data.token) {
          commit(types.LOGIN, {
            token: res.data.token
          });
          // go to Home.vue
          router.push({
            name: "Home"
          });
        }
      });
    },
    async fetchPhotos({ commit }, payload) {
      const { p } = payload;
      const { data } = await fetchPhotos(p);
      commit(types.UPDATE_PHOTOS, {
        photos: data.photos
      });
      commit(types.UPDATE_PAGE, data.page);
    }
  },
  modules: {}
});
