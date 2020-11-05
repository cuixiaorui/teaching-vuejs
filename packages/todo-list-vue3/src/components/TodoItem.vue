<template>
  <li :class="item.state === 'completed' ? 'isCompleted' : ''">
    {{ item.title }}
  </li>
  <div>
    <el-button size="mini" type="success" @click="removeTodo">remove</el-button>
    <el-button size="mini" type="danger" @click="completeTodo"
      >complete</el-button
    >
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  props: ["item"],

  setup(props) {
    const store = useStore();
    const removeTodo = () => {
      console.log("??")
      store.commit("removeTodo", {
        id: props.item.id
      });
    };

    const completeTodo = () => {
      store.commit("completeTodo", {
        id: props.item.id
      });
    };

    return {
      removeTodo,
      completeTodo
    };
  }
};
</script>

<style scoped>
.isCompleted {
  text-decoration: line-through;
}
</style>
