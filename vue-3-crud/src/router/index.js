import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage";


const routes =  [
  {
    path: "/",
    name: "HomePage",
    component: HomePage
  }
  // {
  //   path: "/register",
  //   name: "AddTutoPage",
  //   component: AddTutoPage
  // },  
  // {
  //   path: "/users/dashboard",
  //   name: "TutorialsList",
  //   component: TutorialsListPage
  // }


];
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
