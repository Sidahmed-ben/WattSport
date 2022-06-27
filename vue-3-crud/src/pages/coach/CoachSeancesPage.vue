<template>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round" />
  <link
    rel="stylesheet"
    href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
  />
  
  <link
    rel="stylesheet"
    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
  /> 
  <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />

  <!--header area start-->
  <header :class="{ disable: disable  }">
    <div class="left_area">
      <h3>Watt Sport</h3>
    </div>
    <div class="right_area">
      <button @click="userLogout" class="logout_btn">Logout</button>
    </div>
  </header>
  <!--header area end-->
  <!--sidebar start-->
  <div class="sidebar"  :class="{ disable: disable  }">
    <center>
      <img src="../../../public/home.png" class="profile_image" alt />
      <h4>{{ "Coach name" }}</h4>
    </center>
    <router-link to="/coach/profil" class="nav-link">
      <span>Profil</span>
    </router-link>
    <router-link to="" class="nav-link">
      <span>Séances</span>
    </router-link>
  </div>
  <!--sidebar end-->
  <!--content start-->
  <div class="content"  :class="{ disable: disable  }">
    <br />
    <br />
    <br />
    <br />
    <br />
    <TableSeanceCoachCmp @clicked="onClickChild"></TableSeanceCoachCmp>
    <br />
    <br />
    <br />
  </div>
</template>

<script>

import UsersDataService from "@/services/UsersDataService";
import TableSeanceCoachCmp from "../../components/TableSeanceCoachCmp.vue";


export default {

  name: "SeancesPage",
  components: { TableSeanceCoachCmp },
  props: [],
  data() {
    return {
      disable: false,
      editEmployeeModal : false,
      addEmployeeModal : false,
      deleteEmployeeModal : false
    }
  },
  methods: {
    userLogout() {
      console.log("///////////////////////////");
      UsersDataService.logoutUser()
        .then((result) => {
          console.log(" Users Logout succeffuly");
          console.log(result);
          this.$router.push("/login");
        })
        .catch((e) => {
          console.log(e.response.data);
          this.servErrors.push({ error: e.response.data });
        });
    },
    onClickChild(disable){
      console.log("onclick");
      this.disable = disable
    }

  },
};
</script>

<style scoped>
/*  Navbar css */
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
  transition-property: background;
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

.content {
  margin-left: 250px;
  background: url("../../../public/5.jpg") no-repeat;
  background-position: center;
  background-size: cover;
  height: 100vh;
  transition: 0.5s;
  position: relative;
}
/* ---------------------------------------------- */

.disable{
  pointer-events: none;
}

</style>
