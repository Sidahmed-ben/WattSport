<template >
  <!-- Bootstrap Icons Starts -->
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.3.0/font/bootstrap-icons.css"
  />
  <!-- Bootstrap Icons Ends -->
  <div class="container-xl div-cont-xl">
    <div class="table-responsive">
      <div class="table-wrapper">
        <div class="table-title" >
          <div class="row" style="text-align: center;">
            <div class="col-sm-12">
              <h2>
                <b>{{ titreTableau }}</b>
              </h2>
              <button
                class="close"
                id="exit"
                @click="hideListEvent();"
              >&times;</button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
          <!-- <div> -->
          <thead>
            <tr>
              <th v-for="(column, index) in columns" :key="index">{{ column.column }}</th>
            </tr>
          </thead>
          <!-- </div> -->
          <tbody>
            <tr v-for="(item,index1) in items" :key="index1">
              <td v-for="(column,index2) in item.columns" :key="index2">
                <div v-if="index2 !=='validated'">
                  {{ column }}
                </div>
                <div v-else>
                  <!-- The session was not validated by the coach -->
                  <div v-if='column === false'>
                    <button type="button" class="btn btn-outline-success" @click="validateUser(index1)">Valider</button>      
                    <button type="button" class="btn btn-outline-danger"  @click="invalidateUser(index1)">Supprimer</button>
                  </div>
                  <!-- Session was already validated by the coach -->
                  <div class ="admis" v-else-if = 'column === true'>
                    <button type="button" class="btn btn-success disabled">Validé</button>      
                  </div>
                  
                  <div class ="supp" v-else>
                    <button type="button" class="btn btn-danger disabled">Supprimé</button>      
                  </div>

                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--  Fin du tableau  -->
      </div>
    </div>
  </div>
  


</template>

<script>
import UsersDataService from "@/services/UsersDataService";

export default {
  name: "ListUsersByLesson",
  components: {  },
  props: ["selectedSession"],
  data() {
    return {
      items: [],
      columns: [],
      titreTableau: "",
    };
  },
  mounted() {

    this.columns = [{ column: "Id", type: "text" },{ column: "Nom", type: "text" }, { column: "Email", type: "text" },{ column: "Actions", type: null }];
    this.titreTableau = "List des utilisateurs ";
    let selectedSessionJson = JSON.parse(JSON.stringify(this.selectedSession));
    console.log(" Je suis dans la list, la session séléctionnée est => ",selectedSessionJson.id);

    UsersDataService.getUsersByLesson({id :selectedSessionJson.id})
      .then((result) => {
        console.log(" Coach's lessons by user Fetched Successfuly")
        console.log(result.data);
        let users = result.data ;
        let item;
        // Itérate the array that contains session data
        users.forEach(user => {
          item = {columns: {id:user.entrain_id,name:user.name,email:user.email,validated:user.validated}};
          this.items.push(item);
        });
      })
      .catch((e) =>{
        console.log(" Erro in coach's lessons by user Fetching ")
        console.log(e)
      });

    this.titreTableau = "Utilisateurs";
    console.log(" Mounted ");
  },
  methods: {
    hideListEvent() {
      console.log("HideList");
      this.$emit('hideListEvent')
    },
    validateUser(index){
      console.log("utilisateur validé => ", JSON.parse(JSON.stringify(this.items[index])) );
      let userId = JSON.parse(JSON.stringify(this.items[index])).columns.id;
      let selectedSessionJson = JSON.parse(JSON.stringify(this.selectedSession));
      let sessionId = selectedSessionJson.id ;
      console.log("userId => ",userId,"SessionId => ",sessionId );
      UsersDataService.validateUserSession({userId, sessionId})
        .then((result) => {
          console.log(" Succefful Coach Validation ");
          // Update the front-end 
          this.items[index].columns.validated = true
          console.log(result);

        })
        .catch((e) =>{
          console.log(" Erro in users validation by the coach. ")
          console.log(e)
        });
    },
    invalidateUser(index){
      // Invalidate user means that we delete his row in entrain_session table in db.
      console.log("utilisateur inValidé => ", JSON.parse(JSON.stringify(this.items[index])) );
      let userId = JSON.parse(JSON.stringify(this.items[index])).columns.id;
      let selectedSessionJson = JSON.parse(JSON.stringify(this.selectedSession));
      let sessionId = selectedSessionJson.id ;
      console.log("userId => ",userId,"SessionId => ",sessionId );
      UsersDataService.inValidateUserSession({userId, sessionId})
        .then((result) => {
          console.log(" Succefful Coach inValidation ");
          // Update the front-end 
          this.items[index].columns.validated = null;
          console.log(result);
        })
        .catch((e) =>{
          console.log(" Error in users invalidation by the coach. ")
          console.log(e)
        })

    }
  }
};
</script>

<style scoped>
/* Tableau css */

div.div-cont-xl {
  position: absolute;
  /* margin: 0px auto; */
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.table-responsive {
  margin: 30px 0;
}
.table-wrapper {
  background: #fff;
  padding: 20px 25px;
  border-radius: 3px;
  min-width: 700px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: auto;
  height: 700px;
  width: 700px;
  margin: auto;
}
.table-title {
  padding-bottom: 15px;
  background: #2f323a;
  color: #fff;
  padding: 16px 30px;
  min-width: 100%;
  margin: -20px -25px 0px;
  border-radius: 3px 3px 0 0;
  position: sticky;
  top: -20px;
  z-index: 9;
}
.table-title h2 {
  margin: 5px 0 0;
  font-size: 24px;
}

.table-title .btn {
  color: #fff;
  float: right;
  font-size: 13px;
  border: none;
  min-width: 50px;
  border-radius: 2px;
  border: none;
  outline: none !important;
  margin-left: 10px;
}
.table-title .btn i {
  float: left;
  font-size: 21px;
  margin-right: 5px;
}
.table-title .btn span {
  float: left;
  margin-top: 2px;
}
table.table tr th,
table.table tr td {
  border-color: #e9e9e9;
  padding: 12px 15px;
  vertical-align: middle;
}
table.table tr th:first-child {
  width: auto;
}
table.table tr th:last-child {
  width: 230px;
  text-align: center;
}

table.table-striped tbody button {
  margin-left: 10px;
}


table.table-striped tbody tr:nth-of-type(odd) {
  background-color: #fcfcfc;
}
table.table-striped.table-hover tbody tr:hover {
  background: #f5f5f5;
}
table.table th i {
  font-size: 13px;
  margin: 0 5px;
  cursor: pointer;
}
table.table td:last-child i {
  opacity: 0.9;
  font-size: 22px;
  margin: 0 5px;
}

table.table td a {
  font-weight: bold;
  color: #566787;
  display: inline-block;
  text-decoration: none;
  outline: none !important;
}
table.table td a:hover {
  color: #2196f3;
}
table.table td a.edit {
  cursor: pointer;
  color: #ffc107;
}
table.table td a.delete {
  cursor: pointer;
  color: #f44336;
}
table.table td a.list {
  cursor: pointer;
  color: #001e4f;
}
table.table td i {
  font-size: 19px;
}

.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}

/* ---------------------------------------------- */

.container-xl {
  padding-right: 0;
  padding-left: 0;
}

.table thead th {
  position: sticky;
  top: 47px;
  background-color: rgb(255, 255, 255);
  z-index: 9;
  margin-top: 0;
}
/* ---------------------------------------------- */


button#exit{
     line-height: 12px;
     width: 18px;
     font-size: 15pt;
     font-family: tahoma;
     margin-top: 1px;
     margin-right: 2px;
     position:absolute;
     top:0;
     right:0;
     color: white;
}

div.admis, div.supp{
  text-align: center;
}
</style>
