<template>
  <div>
    <span
      data-testid="content"
      :class="{ completed: this.state === 'completed' }"
    >
      {{ this.content }}
    </span>

    <button data-testid="remove" @click="remove">remove</button>
    <button data-testid="complete" @click="handleComplete">complete</button>
  </div>
</template>

<script>
export default {
  props: ["content", "id", "state"],

  methods: {
    remove() {
      this.$emit("remove", this.id);
    },
    handleComplete() {
      if (this.state === "active") {
        this.$emit("update:state", "completed");
      } else if (this.state === "completed") {
        this.$emit("update:state", "active");
      }
    },
  },
};
</script>

<style  scoped>
.completed {
  text-decoration: line-through;
}
</style>
