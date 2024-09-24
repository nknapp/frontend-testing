import { mount, VueWrapper } from "@vue/test-utils";
import { afterEach, beforeEach } from "vitest";
import { ComponentConstructor } from "@/test-utils/types.ts";
import { createMyRouter } from "@/router/router.ts";

export interface RenderComponentReturn<T> {
  wrapper: VueWrapper<T>;
}

type ComponentProps<T extends ComponentConstructor> = InstanceType<T>["$props"];

let wrappers: VueWrapper<any>[] = [];
const appDiv = document.createElement("div");
appDiv.setAttribute("id", "app");
document.body.append(appDiv);

// Render a component and attach it to the dom, so that we can use @testing-library utils
// yes @testing-library/vue is doing exactly this.
// This is just to show that there is no magic, and you can do it even if there
// is no testing library support for your framework
//
// More setup to be expected here
export function renderComponent<T extends ComponentConstructor>(
  component: T,
  props: ComponentProps<T> = {},
): RenderComponentReturn<T> {
  const wrapper = mount(component, {
    props,
    attachTo: appDiv,
    global: {
      plugins: [createMyRouter()],
    },
  });

  wrappers.push(wrapper);
  return { wrapper };
}

beforeEach(() => {
  appDiv.innerHTML = "";
});

afterEach(() => {
  for (const wrapper of wrappers) {
    // Unmount components after a test to invoke cleanup hooks in the components
    wrapper.unmount();
  }
  wrappers = [];
});
