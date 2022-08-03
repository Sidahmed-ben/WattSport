import { createWebHistory, createRouter } from "vue-router";
import HomePage from "../pages/HomePage";
import RegisterPage from "../pages/RegisterPage";
import CoachHomePage from "../pages/coach/CoachHomePage";
import CoachVideoPage from "../pages/coach/CoachVideoPage";
import CoachSeancesPage from "../pages/coach/CoachSeancesPage";
import CoachSessionTypePage from "../pages/coach/CoachSessionTypePage";
import UserHomePage from "../pages/user/UserHomePage";
import UserSeancesDisponiblesPage from "../pages/user/UserSeancesDisponiblesPage";
import UserSeancesValidesPage from "../pages/user/UserSeancesValidesPage";
import UsersDataService from "../services/UsersDataService";
import NotFoundPage from '../pages/NotFoundPage.vue';


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
    path: "/coach/seances_types",
    name: "CoachSessionTypePage",
    component: CoachSessionTypePage,
    props: true
  },

  {
    path: "/coach/video",
    name: "CoachVideoPage",
    component: CoachVideoPage,
    props: true
  },

  {
    path: "/coach/seances_types/:type",
    name: "CoachSeancesPage",
    component: CoachSeancesPage,
    props: true,
    meta: {
      urlCheck: true
    }
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
  {
    path: "/:pathMatch(.*)*",
    component: NotFoundPage
  }
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

      
  // Vérify the id of the sessionType in the url. 
  }else if ( to.meta.urlCheck ){
    console.log(to.params.type)
    let urlTypeSessionParam = to.params.type; 
    await UsersDataService.getSessionTypes()
      .then((result) => {
        console.log(" GetSessionTypes Succeffull ");
        console.log(result.data);
        let listTypes = result.data; 
        let list_types_id = []
        for(let ind in listTypes) {
          list_types_id.push(listTypes[ind].id);
        }
        console.log(list_types_id);
        console.log(typeof(urlTypeSessionParam))
        console.log(listTypes.includes(urlTypeSessionParam))
        if(list_types_id.includes(urlTypeSessionParam)){
          return  next();
        }else{
          return next({ path: '/error' })
        }
      })
      .catch((e) => {
        // console.log(" ERROR IN GETTING SESSION TYPES ");
        console.log(e);
        return next({ path: '/error' })

      });
  }
  else {
    return next();
  }
 
});



export default router;
