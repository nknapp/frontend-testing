import { createRouter, createWebHashHistory } from "vue-router";
import { retry } from "@/eslint-examples/retry.ts";

export function createMyRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      {
        path: "/",
        component: () => retry(() => import("@/pages/TodosPage.vue")),
      },
      {
        path: "/visual/",
        component: () =>
          retry(() => import("@/pages/visual-regression/VisualTests.vue")),
      },
      {
        path: "/visual/video",
        component: () =>
          retry(() => import("@/pages/visual-regression/VideoPage.vue")),
      },
      {
        path: "/visual/animation",
        component: () =>
          retry(() => import("@/pages/visual-regression/AnimationPage.vue")),
      },
      {
        path: "/test/clipboard",
        component: retry(() => import("@/pages/test/ClipboardPage.vue")),
      },
    ],
  });
}
