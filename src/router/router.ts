import { createRouter, createWebHashHistory } from "vue-router";
import {retry} from "@/eslint-examples/retry.ts";

export function createMyRouter() {
  return createRouter({
    history: createWebHashHistory(),
    routes: [
      { path: "/", component: () => retry(() => import("@/pages/TodosPage.vue")) },
      {
        path: "/test/clipboard",
        component: retry(() => import("@/pages/test/ClipboardPage.vue")),
      },
    ],
  });
}
