import { createStore } from "vuex";

function createId() {
  return new Date().getTime();
}

const todoState = {
  ACTIVE: "active",
  COMPLETED: "completed"
};

export default createStore({
  state: {
    todoList: [],
    filterList: []
  },
  mutations: {
    filterCompleted(state) {
      state.filterList = state.todoList.filter(
        item => item.state === todoState.COMPLETED
      );
    },
    filterAll(state) {
      state.filterList = [...state.todoList];
    },
    filterActive(state) {
      state.filterList = state.todoList.filter(
        item => item.state === todoState.ACTIVE
      );
    },
    completeTodo(state, payload) {
      console.log(state);
      const { id } = payload;
      // 更改 item 的state
      const item = state.todoList.find(item => item.id === id);

      if (item.state === todoState.ACTIVE) {
        item.state = todoState.COMPLETED;
      } else if (item.state === todoState.COMPLETED) {
        item.state = todoState.ACTIVE;
      }
    },
    addTodo(state, payload) {
      const { title } = payload;

      const createTodo = () => {
        return {
          title,
          id: createId(),
          state: todoState.ACTIVE
        };
      };

      state.todoList.push(createTodo());
      state.filterList = [...state.todoList];
    },
    removeTodo(state, payload) {
      const { id } = payload;

      console.log(state);
      state.todoList = state.todoList.filter(item => item.id !== id);
      state.filterList = [...state.todoList];
    }
  },
  actions: {},
  modules: {}
});
