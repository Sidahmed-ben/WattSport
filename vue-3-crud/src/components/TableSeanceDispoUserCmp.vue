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
                {{ column }}</td>
              <td>
                <div>
                  <button type="button" class="btn btn-primary" @click="sessionRegister(index1)">s'inscrire</button>
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
import UsersDataService from "../services/UsersDataService";


export default {
  name: "TableSeanceDispoUserCmp.vue",
  components: {},
  props: ["titreTableau"],
  data() {
    return {
      items: [],
      columns: [],
    };
  },
  mounted() {
    UsersDataService.getCoachSessionList()
      .then((result) => {
        console.log(" lessons Fetched Successfuly ")
        console.log(result.data);
        let sessionDate;
        let item;
        // Session Data 
        let formatedDate;
        let formatedTime;
        let sessionTitle;
        let sessionId;
        // Itérate the array that contains session data
        result.data.forEach(session => {
          console.log(session.session_date);
          sessionDate = session.session_date;
          // Session date
          formatedDate = this.extractDateFromQuery(sessionDate);
          console.log(" Formated date ",formatedDate);
          // Session time
          formatedTime = this.extractTimeFromQuery(sessionDate);
          console.log("formatedTime " ,formatedTime);
          // Session title
          sessionTitle = session.title;
          console.log(sessionTitle);
          // Session id
          sessionId = session.session_id;
          console.log(sessionId);

          item = { columns: {id:sessionId,title:sessionTitle,date:formatedDate,time:formatedTime}};
          this.items.push(item);  
        });
      })
      .catch((e) =>{
        console.log(" Erro in coach lessons Fetching ")
        console.log(e)
      });

    this.columns = [{ column: "Id", type: null },{ column: "Titre", type: "text" }, { column: "Date : aaaa/mm/jj ", type: "TimePicker" }, { column: "Heure", type: null }, { column: "Actions", type: null }];
    console.log(" Mounted ");
  },


  methods: {
    hideListEvent() {
      console.log("HideList");
      this.$emit('hideListEvent')
    },
    extractDateFromQuery(query){
      // Extraction de la date
      let formated_date = query.match("[0-9]{4}([-/.])[0-9]{2}[-/.][0-9]{2}");
      if(formated_date != null) {
        let dateSplitted = formated_date[0];
        return dateSplitted;
      }else{
        console.log( "EXTRACTED DATE FORMAT FROM POSTGRESQL ERROR (REGEX ERROR)");
        return null;
      }
    },
    extractTimeFromQuery(query){
      // Extraction de la date
      let formated_time = query.match("[0-9]{2}[:][0-9]{2}");
      if(formated_time != null) {
        let timeSplitted = formated_time[0];
        return timeSplitted;
      }else{
        console.log( "EXTRACTED TIME FORMAT FROM POSTGRESQL ERROR (REGEX ERROR)");
        return null;
      }
    },
    sessionRegister(index){
      this.selectedRow = index;
      let selectedSession = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));
      UsersDataService.registerUserSession(selectedSession)
        .then((result) => {
          console.log(result);

        })
      .catch((e) =>{
        if(e.response.status === 409){
          console.log(" USER ALREADY REGISTERED IN THE SESSION ");
          return
        }else{
          console.log(" ERROR IN REGISTERING USER IN SESSION ");
        }
        console.log(e)
      });

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
  min-width: 200px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: auto;
  height: 700px;
  width: 1000px;
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
  width: 180px;
  padding-left: 40px;
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
</style>
