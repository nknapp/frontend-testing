import { describe, it, expect } from "vitest";
import { renderComponent } from "@/test-utils/renderComponent.test-helper.ts";
import { dom } from "@/test-utils/dom.test-helper.ts";
import { defineComponent, ref } from "vue";
import TextField from "@/components/TextField.vue";
import { user } from "@/test-utils/user.test-helper.ts";

// Example for how to respect the developer-view on a tested component.
// The component is rendered in a wrapper component that connects prop values to updat events,
// thus, the update is visible on the screen.
function renderTextField({
  label = "label",
  initialValue = "",
  autoFocus = false,
}) {
  const value = ref<string>(initialValue);

  const renderResult = renderComponent(
    defineComponent({
      template: `<div>
                    <TextField :label="label" v-model="value" :auto-focus="autoFocus" />
                    <span>Other Element</span>
                 </div>`,
      components: { TextField },
      setup() {
        return { label, value, autoFocus };
      },
    }),
  );
  return {
    ...renderResult,
    value,
  };
}

describe("TextField", () => {
  it("renders label and input field", () => {
    renderTextField({ label: "label", initialValue: "value" });
    expect(dom.getByLabelText("label")).not.toBeNull();
  });

  it("selects input on click", async () => {
    const { value } = renderTextField({
      label: "label",
      initialValue: "value",
    });

    await user.click(dom.getByLabelText("label"));
    await user.keyboard("something else{enter}");
    expect(dom.getByLabelText("label")).toHaveValue("something else");
    expect(value.value).toEqual("something else");
  });

  it("with autofocus prop set, focuses on mount", async () => {
    const { value } = renderTextField({
      label: "label",
      initialValue: "value",
      autoFocus: true,
    });

    await user.keyboard("something else{enter}");
    expect(dom.getByLabelText("label")).toHaveValue("something else");
    expect(value.value).toEqual("something else");
  });

  it("save on blur", async () => {
    const { value } = renderTextField({
      label: "label",
      initialValue: "value",
    });

    await user.click(dom.getByLabelText("label"));
    await user.keyboard("something else");
    expect(value.value).toEqual("value");
    await user.click(dom.getByText("Other Element"));
    expect(dom.getByLabelText("label")).toHaveValue("something else");
    expect(value.value).toEqual("something else");
  });

  it("default value", () => {
    renderTextField({ initialValue: "some value" });
    expect(dom.getByDisplayValue("some value")).not.toBeNull();
  });
});
