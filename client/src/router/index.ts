import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Downloader/Home.vue")
  },
  {
    path: "/post",
    name: "Post",
    component: () => import("../views/Post/Post.vue")
  },
  {
    path: "/description",
    name: "Description",
    component: () => import("../views/Description/Description.vue")
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
