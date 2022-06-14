import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
// import UserHomePage from "../pages/UserHomePage";
import CoachHomePage from "../pages/CoachHomePage";
import SeancesPage from "../pages/SeancesPage";
import UsersDataService from "../services/UsersDataService";


const routes =  [
  {
    path: "/",
    alias: '/login',
    name: "HomePage",
    component: HomePage,
    props: true
  },
  {
    path: "/register",
    name: "RegisterPage",
    component: RegisterPage,
    props: true

  },
  // {
  //   path: "/coach",
  //   name: "UserHomePage",
  //   component: UserHomePage,
  //   meta: {
  //     userMustAuth: true
  //   }
  // },
  {
    path: "/coach/profil",
    name: "CoachHomePage",
    component: CoachHomePage,
    props: true

  },
  {
    path: "/coach/seances",
    name: "SeancesPage",
    component: SeancesPage,
    props: true

  },

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});



// let isAuthenticated = false;
router.beforeEach(async (to,from,next) => {
  // // Send a request to server in order to verify the authaurisation 
  if(to.path !== '/login' && to.meta.userMustAuth){
    await UsersDataService.checkUserHomeAutho()
      .then((response) => {
        // Status 200 authorized
        // If the user is logged so he is Auth from the server
        console.log(' CONNECTED ')
        console.log(response);
        // router.push({ path: '/user' });
        return next();
      
      })
      .catch((err)=>{
        // Status 401 not authorized from server because no logging detected
        console.log(' NOT CONNECTED ')
        console.log(err);
        // return next('/login');
        // router.push({ path: '/user' });
        return next({ path: '/login' })
      })
  }else{
    return next();
  }
 
});



export default router;
