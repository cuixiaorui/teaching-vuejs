<template>
  <div>
    <img :src="photoItem.imgUrl" alt="" />
    <p>{{ photoItem.name }}</p>
    <button @click="handleBack">back</button>
  </div>
</template>

<script>
import { fetchPhotoById } from "@/api";
export default {
  props: ["id"],
  data() {
    return {
      photoItem: ""
    };
  },
  methods: {
    handleBack() {
      this.$router.push({
        name: "Home"
      });
    }
  },
  created() {
    const item = this.$store.getters.getPhotoItemById(this.id);

    if (item) {
      this.photoItem = item;
    } else {
      // 请求后端接口，获取数据
      fetchPhotoById(this.id).then(res => {
        this.photoItem = res.data;
      });
    }
  }
};
</script>

<style scoped></style>
