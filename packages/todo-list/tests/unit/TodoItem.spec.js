import TodoItem from "@/components/TodoItem.vue";
import { mount } from "@vue/test-utils";

describe("TodoItem", () => {
  test("item container", () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        content: "todo1",
      },
    });

    expect(wrapper.get('[data-testid="content"]').text()).toBe("todo1");
  });

  test("emitted remove event when click remove btn", async () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        id: 1,
      },
    });
    await wrapper.get('[data-testid="remove"]').trigger("click");
    expect(wrapper.emitted("remove")[0]).toEqual([1]);
  });

  test("emitted completed event when click complete button", async () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        id: 1,
        state: "active",
      },
    });

    await wrapper.get('[data-testid="complete"]').trigger("click");
    expect(wrapper.emitted("update:state")[0]).toEqual(["completed"]);

    wrapper.setProps({
      state: "completed",
    });
    await wrapper.get('[data-testid="complete"]').trigger("click");
    expect(wrapper.emitted("update:state")[1]).toEqual(["active"]);
  });

  test("have complete class name when state equal to completed", () => {
    const wrapper = mount(TodoItem, {
      propsData: {
        state: "completed",
      },
    });

    expect(wrapper.get('[data-testid="content"]').classes()).toContain(
      "completed"
    );
  });
});
