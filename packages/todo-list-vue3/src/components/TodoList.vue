<template>
  <div>
    <input v-model="newTodo" type="text" @keypress.enter="addTodo" />

    <div>
      <ul>
        <template v-for="item in filterList" :key="item.id">
          <TodoItem :item="item"></TodoItem>
        </template>
      </ul>
    </div>

    <div>
      <el-button @click="filterAll">all</el-button>
      <el-button @click="filterActive">active</el-button>
      <el-button @click="filterCompleted">completed</el-button>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import { computed, ref } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TodoItem
  },
  setup() {
    const store = useStore();
    const newTodo = ref(null);

    const addTodo = () => {
      store.commit("addTodo", {
        title: newTodo.value
      });

      // reset
      newTodo.value = "";
    };

    // const todoList = computed(() => store.state.todoList);
    const filterList = computed(() => {
      return store.state.filterList;
    });

    const filterActive = () => {
      store.commit("filterActive");
    };

    const filterAll = () => {
      store.commit("filterAll");
    };
    const filterCompleted = () => {
      store.commit("filterCompleted");
    };

    return {
      newTodo,
      filterList,
      filterAll,
      filterCompleted,
      //   todoList,
      addTodo,
      filterActive
    };
  }
};
</script>

<style lang="scss" scoped></style>
