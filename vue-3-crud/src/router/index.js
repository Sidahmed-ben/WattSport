import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";


const routes =  [
  {
    path: "/",
    name: "HomePage",
    component: HomePage
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage
  }  
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
