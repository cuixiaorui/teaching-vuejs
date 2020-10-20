import TodoList from "@/components/TodoList.vue";
import TodoItem from "@/components/TodoItem.vue";
import { mount } from "@vue/test-utils";

describe("TodoList", () => {
  test("add one todo item when press entry ", async () => {
    const wrapper = mount(TodoList, {});
    const input = wrapper.get("[data-testid='add-item']");
    await input.trigger("keyup.enter");
    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(1);
  });

  test("clean input value when added one todo item", async () => {
    const wrapper = mount(TodoList);
    const input = wrapper.get("[data-testid='add-item']");
    await input.setValue("foo");
    expect(input.element.value).toBe("foo");
    await input.trigger("keyup.enter");
    expect(input.element.value).toBe("");
  });

  test("should remove item when click remove button", async () => {
    const wrapper = mount(TodoList);
    const input = wrapper.get("[data-testid='add-item']");
    await input.setValue("todo1");
    await input.trigger("keyup.enter");

    const todoItem = wrapper.findComponent(TodoItem);
    await todoItem.find("[data-testid='remove']").trigger("click");

    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(0);
  });

  test("should remove item when click remove button", async () => {
    const wrapper = mount(TodoList);
    const input = wrapper.get("[data-testid='add-item']");

    await input.setValue("todo1");
    await input.trigger("keyup.enter");

    await input.setValue("todo2");
    await input.trigger("keyup.enter");

    const todoItem = wrapper.findComponent(TodoItem);
    await todoItem.find("[data-testid='remove']").trigger("click");
    const todoItems = wrapper.findAllComponents(TodoItem);
    expect(todoItems.length).toBe(1);
    expect(
      todoItems
        .at(0)
        .get('[data-testid="content"]')
        .text()
    ).toBe("todo2");
  });

});
