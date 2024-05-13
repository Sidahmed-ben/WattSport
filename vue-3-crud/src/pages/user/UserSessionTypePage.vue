
 
<template>
  <input type="checkbox" id="check" />
  <!--header area start-->
  <header>
    <div class="left_area">
      <h3>Watt Sport</h3>
    </div>
    <div class="right_area">
      <button @click="userLogout" class="logout_btn">Logout</button>
    </div>
  </header>
  <!--header area end-->
  <!--sidebar start-->
  <div class="sidebar">
    <center>
      <img src="../../../public/home.png" class="profile_image" alt />
      <h4>{{ "User name" }}</h4>
    </center>

    <router-link to="/user/profil" class="nav-link">
      <span>Profil</span>
    </router-link>
    <router-link to="" class="nav-link">
      <span>Séances disponibles</span>
    </router-link>
    <router-link to="/user/seances_valides" class="nav-link">
      <span>Séances validées</span>
    </router-link>
    <router-link to="/user/video" class="nav-link">
      <span>Vidéo</span>
    </router-link>
  </div>
  <!--sidebar end-->

  <!--content start-->
  <div class="content">
    <br />
    <br />
    <br />
    <br />
    <br />

    <div class="row text-center">
        <!--Grid column-->
       <div v-for="(type,index) in listTypes" class="col-xl-4  hover14 " :key="index">
          <figure>
            <img @click="getSessions(type.id)" style="width: 300px;height: 300px;" class="rounded-circle" src="../../../public/abdo.jpg" alt="An awesome picture" />
            <figcaption style ="color: #0b87a6;" class="my-5 h3" >{{type.name}}</figcaption>
          </figure>
       </div>    
      <!--Grid column-->

    </div>      
  </div>
</template>
  

<script>
import UsersDataService from '@/services/UsersDataService';

export default {
  name: 'UserSessionTypePage',
  components: {},
  props: [],
  data() {
    return {
      listTypes : []
    }
  },
  mounted(){
    UsersDataService.getSessionTypes()
      .then((result) => {
        console.log(" GetSessionTypes Succeffull ");
        console.log(result.data);
        this.listTypes = result.data; 

      })
      .catch((e) => {
        console.log(" ERROR IN GETTING SESSION TYPES ");
        console.log(e.response.data);
      });
  },
  methods: {
    userLogout() {
      console.log("///////////////////////////")
      UsersDataService.logoutUser()
        .then((result) => {
          console.log(" Users Logout succeffuly");
          console.log(result);
          this.$router.push('/login');
        })
        .catch(e => {
          console.log(e.response.data);
          this.servErrors.push({ error: e.response.data });
        });
    },
    getSessions(id){
      console.log(" Type with id => ",id);
      this.$router.push('/user/seances_disponibles/'+id);
    }
  }
}

</script>




<style scoped>

 /* Shine */
.rounded-circle:hover  {
 opacity: 0.6;
}
.session-type-image {
  background: url("../../../public/abdo.jpg") no-repeat;
}
.rounded-circle {
  box-shadow: 0 0 0 10px #0b87a6 ;
}
a:link {
  text-decoration: none;
}

.order-card {
  color: #fff;
}

.bg-c-blue {
  background: linear-gradient(45deg, #4099ff, #73b4ff);
}

.bg-c-green {
  background: linear-gradient(45deg, #2ed8b6, #59e0c5);
}

.bg-c-yellow {
  background: linear-gradient(45deg, #ffb64d, #ffcb80);
}

.bg-c-pink {
  background: linear-gradient(45deg, #ff5370, #ff869a);
}

.card {
  border-radius: 5px;
  -webkit-box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  box-shadow: 0 1px 2.94px 0.06px rgba(4, 26, 55, 0.16);
  border: none;
  margin-bottom: 30px;
  -webkit-transition: all 0.3s ease-in-out;
  transition: all 0.3s ease-in-out;
}

.card .card-block {
  padding: 25px;
}

.order-card i {
  font-size: 26px;
}

.f-left {
  float: left;
}

.f-right {
  float: right;
}

a:link {
  text-decoration: none;
}

body {
  margin: 0;
  padding: 0;
  font-family: "Roboto", sans-serif;
}

header {
  position: fixed;
  background: #22242a;
  padding: 20px;
  width: 100%;

  z-index: 1;
}

.left_area h3 {
  color: #fff;
  margin: 0px;
  text-transform: uppercase;
  font-size: 22px;
  font-weight: 900;
}

.left_area span {
  color: #19b3d3;
}

.logout_btn {
  padding: 5px;
  background: #19b3d3;
  text-decoration: none;
  float: right;
  margin-top: -30px;
  margin-right: 40px;
  border-radius: 2px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
  transition: 0.5s;
  width: 100px;
  border-radius: 20px;
}

.logout_btn:hover {
  background: #0b87a6;
}

.sidebar {
  background: #2f323a;
  margin-top: 70px;
  padding-top: 30px;
  position: fixed;
  left: 0;
  width: 250px;
  height: 100%;
  transition: 0.5s;
  transition-property: left;
}

.sidebar .profile_image {
  width: 100px;
  height: 100px;
  border-radius: 100px;
  margin-bottom: 10px;
}

.sidebar h4 {
  color: #ccc;
  margin-top: 0;
  margin-bottom: 20px;
}

.sidebar a {
  color: #fff;
  display: block;
  width: 100%;
  line-height: 60px;
  text-decoration: none;
  padding-left: 40px;
  box-sizing: border-box;
  transition: 0.5s;
  transition-property: background;
}

.sidebar a:hover {
  background: #19b3d3;
}

.sidebar i {
  padding-right: 10px;
}

label #sidebar_btn {
  z-index: 1;
  color: #fff;
  position: fixed;
  cursor: pointer;
  left: 300px;
  font-size: 20px;
  margin: 5px 0;
  transition: 0.5s;
  transition-property: color;
}

label #sidebar_btn:hover {
  color: #19b3d3;
}

#check:checked ~ .sidebar {
  left: -190px;
}

#check:checked ~ .sidebar a span {
  display: none;
}

#check:checked ~ .sidebar a {
  font-size: 20px;
  margin-left: 170px;
  width: 80px;
}

.content {
  margin-left: 250px;
  /* background: url("../../../public/font7.jpg") no-repeat; */
  background-color: #101523;
  background-position: center;
  background-size: cover;
  height: 100vh;
  transition: 0.5s;
  overflow: scroll;

}

#check:checked ~ .content {
  margin-left: 60px;
}

#check {
  display: none;
}
</style>















<!-- <template>
    <h3> WELCOME TO WATT SPORT USER HOME </h3>
</template>


<script>


</script>


<style>
</style> -->