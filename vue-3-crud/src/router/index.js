import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import CoachHomePage from "../pages/coach/CoachHomePage";
import CoachSeancesPage from "../pages/coach/CoachSeancesPage";
import UserHomePage from "../pages/user/UserHomePage";
import UserSeancesDisponiblesPage from "../pages/user/UserSeancesDisponiblesPage";
import UserSeancesValidesPage from "../pages/user/UserSeancesValidesPage";
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
  //   // meta: {
  //   //   userMustAuth: true
  //   // }
  // },


  // Coach  
  {
    path: "/coach/profil",
    name: "CoachHomePage",
    component: CoachHomePage,
    props: true,
    // meta: {
    //   userMustAuth: true
    // }

  },
  {
    path: "/coach/seances",
    name: "SeancesPage",
    component: CoachSeancesPage,
    props: true

  },
  // User  
  {
    path: "/user/profil",
    name: "UserHomePage",
    component: UserHomePage,
    props: true

  },
  {
    path: "/user/seances_disponibles",
    name: "UserSeancesDisponiblesPage",
    component: UserSeancesDisponiblesPage,
    props: true
  },
  {
    path: "/user/seances_valides",
    name: "UserSeancesPage",
    component: UserSeancesValidesPage,
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
