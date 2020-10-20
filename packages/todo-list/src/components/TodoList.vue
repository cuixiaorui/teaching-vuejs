<template>
  <div>
    <input
      v-model="newTodo"
      type="text"
      data-testid="add-item"
      @keyup.enter="addItem"
    />

    <div data-testid="item-container">
      <TodoItem
        v-for="todo in todoList"
        :key="todo.id"
        @remove="removeItem"
        :content="todo.content"
        :id="todo.id"
        :state.sync="todo.state"
      >
      </TodoItem>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";

export default {
  components: {
    TodoItem,
  },
  data() {
    return {
      newTodo: "",
      todoList: [],
    };
  },

  methods: {
    createId() {
      return new Date().getTime();
    },
    addItem() {
      this.todoList.push({
        id: this.createId(),
        content: this.newTodo,
        state: "active",
      });
      //clean input value
      this.newTodo = "";
    },
    removeItem(id) {
      this.todoList = this.todoList.filter((todo) => {
        return todo.id !== id;
      });
    },
  },
};
</script>
