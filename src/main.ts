import { createApp } from "vue";
import "@/mvp.css";
import "@/main.css";
import "@/mvp-theme.css";

import App from "./App.vue";
import { addNewTodo, updateTodo } from "@/store/todoStore.ts";
import { createMyRouter } from "@/router/router.ts";

const app = createApp(App);

app.use(createMyRouter());
app.mount("#app");

const todo = addNewTodo();
todo.name = "Stand up";
todo.description = "Get out of bed";
updateTodo(todo);
addNewTodo();
