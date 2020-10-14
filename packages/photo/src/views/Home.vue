<template>
  <div class="home">
    <!-- 展示相关 -->
    <div class="container">
      <div class="photoHeader">
        <div class="imgContainer">
          <img class="photoName" src="../assets/1.jpg" />
        </div>
        <div class="btnContainer">
          <span class="photoTitle">相册名称</span>
          <button class="mybtn" @click="showUploadView = true">
            上传照片
          </button>
        </div>
      </div>

      <el-pagination
        background
        layout="prev, pager, next"
        :total="pageTotal"
        :page-size.sync="pageSize"
        @current-change="handlePaginationChange"
      >
      </el-pagination>

      <div class="photoContainer">
        <template v-for="photo in photos">
          <router-link
            :to="{ name: 'Detail', params: { id: photo.id } }"
            :key="photo.id"
          >
            <div class="photoItem">
              <img :src="photo.imgUrl" />
              <span>
                {{ photo.name }}
              </span>
            </div>
          </router-link>
        </template>
      </div>
    </div>
    <!-- 上传相关 -->
    <UploadView :visible.sync="showUploadView"></UploadView>
  </div>
</template>

<script>
import { mapState } from "vuex";
import UploadView from "../components/UploadView";
export default {
  name: "Home",
  components: {
    UploadView
  },
  data() {
    return {
      showUploadView: false
    };
  },
  computed: {
    ...mapState(["pageSize", "pageTotal", "photos"])
  },

  methods: {
    async handlePaginationChange(pageIndex) {
      this.$store.dispatch("fetchPhotos", {
        p: pageIndex
      });
    }
  },
  async created() {
    this.$store.dispatch("fetchPhotos", {
      p: 1
    });
  }
};
</script>
