<template>
  <div class="uploadPhotoItem">
    <span class="myProgress" v-show="showProgressView">
      <span class="plan" :style="{ width: progress + '%' }"></span>
      {{ progress }}%
    </span>
    <img :src="imgSrc" />
    <span class="pictureName">
      {{ file.name }}
    </span>
  </div>
</template>

<script>
import { fetchUpload } from "@/api";
export default {
  props: ["file"],
  data() {
    return {
      imgSrc: "",
      progress: 0
    };
  },
  created() {
    // 通过传过来的 file 给 imgSrc 赋值
    const render = new FileReader();
    render.onload = () => {
      this.imgSrc = render.result;
    };
    render.readAsDataURL(this.file);
  },

  computed: {
    showProgressView() {
      return this.progress > 0 && this.progress < 100;
    }
  },
  methods: {
    async uploadImg() {
      const res = await fetchUpload(this.file, (loaded, total) => {
        this.progress = Math.floor((loaded / total) * 100);
      });
      console.log(res);
    }
  }
};
</script>

<style lang="scss" scoped></style>
