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
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>
                <b>{{ titreTableau }}</b>
              </h2>
            </div>
            <div class="col-sm-6">
              <button
                @click="disableArea(); addEmployeeModal = true;sessionAlreadyExistsError = false"
                class="btn btn-success"
                data-toggle="modal"
              >
                <i class="material-icons">&#xE147;</i>
                <span>Ajouter une nouvelle séance</span>
              </button>
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
                <!-- To not display the Id (The index 0 is the Id)-->
                <!-- <span v-if ="index2 != 0"> -->
                  {{ column }}
                <!-- </span> -->
              </td>
              <td>
                <div>
                  <a
                    class="edit"
                    data-toggle="modal"
                    @click="disableArea(); editEmployeeModalFunc(index1);"
                  >
                    <i class="bi bi-pencil-square"></i>
                  </a>
                  <a
                    class="delete"
                    data-toggle="modal"
                    @click="disableArea(); deleteEmployeeModal = true; selectedRow = index1;"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </a>
                  <a
                    class="list"
                    data-toggle="modal"
                    @click="listUsers = true; selectedRow = index1;"
                  >
                    <i class="bi bi-list-ul"></i>
                  </a>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
        <!--  Fin du tableau  -->
      </div>
    </div>
  </div>
  <!-- Add Modal HTML -->
  <div id="addEmployeeModal" v-if="addEmployeeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Add Employee</h4>
            <button
              @click="enableArea(); addEmployeeModal = false"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
            >&times;</button>
          </div>
          <div class="modal-body">
            <div v-for="(column,index) in columns" class="form-group" :key="index">
              <div v-if="column.type !== null && column.type !== 'TimePicker'">
                <!-- <label>{{ column.column }}</label> -->
                <!-- <input
                  type="{{column.type}}"
                  class="form-control"
                  v-model="addedRowContent.titre"
                  required
                />
                <div class="input-errors" v-if="v$.addedRowContent.$errors.length > 0" :key="index">
                  <div class="error-msg">{{ v$.addedRowContent.$errors[0].$message }}</div>
                </div> -->
              </div>
              <div v-if="column.type === 'TimePicker'">
                <label>{{ column.column }}</label>
                <DateTimeCmp :defaultTime="defaultTime" @DateUpdated="DateUpdated"></DateTimeCmp>
              </div>
            </div>
            <div class="input-errors"  v-if="sessionAlreadyExistsError" >
              <div class="error-msg"> Une séance avec la même date existe déja </div>
            </div>
          </div>

          <div class="modal-footer">
            <button
              @click="enableArea(); addEmployeeModal = false"
              type="button"
              class="btn btn-default"
              data-dismiss="modal"
            >Annuler</button>
            <button
              type="submit"
              class="btn btn-success"
              @click.prevent="addEmployeeModalFunc()"
            >Ajouter</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Edit Modal HTML -->
  <div id="editEmployeeModal" v-if="editEmployeeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form>
          <div class="modal-header">
            <h4 class="modal-title">Edit Employee</h4>
            <button
              class="close"
              @click="enableArea(); editEmployeeModal = false; defaultTime = null"
            >&times;</button>
          </div>
          <div class="modal-body">
            <div v-for="(column,index) in columns" class="form-group" :key="index">
              <div v-if="column.type !== null && column.type !== 'TimePicker'">
                <!-- <label>{{ column.column }}</label> -->
                <!-- <input
                  type="{{column.type}}"
                  class="form-control"
                  v-model="selectedRowContent.titre"
                  required
                />
                <div
                  class="input-errors"
                  v-if="v$.selectedRowContent.$errors.length > 0"
                  :key="index"
                >
                  <div class="error-msg">{{ v$.selectedRowContent.$errors[0].$message }}</div>
                </div> -->
              </div>
              <div v-if="column.type === 'TimePicker'">
                <label>{{ column.column }}</label>
                <DateTimeCmp :defaultTime="defaultTime" @DateUpdated="DateUpdated"></DateTimeCmp>
              </div>
            </div>
            <div class="input-errors"  v-if="sessionAlreadyExistsError" >
              <div class="error-msg"> Une séance avec la même date existe déja </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              @click="enableArea(); editEmployeeModal = false; defaultTime = null"
            >Annuler</button>
            <button
              type="submit"
              class="btn btn-info"
              @click.prevent="enableArea(); editEmployeeModalFuncSave()"
            >Confirmer</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Delete Modal HTML -->
  <div id="deleteEmployeeModal" v-if="deleteEmployeeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Delete Employee</h4>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            @click="enableArea(); deleteEmployeeModal = false"
          >&times;</button>
        </div>
        <div class="modal-body">
          <p>Are you sure you want to delete these Records?</p>
          <p class="text-warning">
            <small>This action cannot be undone.</small>
          </p>
        </div>
        <div class="modal-footer">
          <button
            class="btn btn-default"
            data-dismiss="modal"
            @click="enableArea(); deleteEmployeeModal = false"
          >Annuler</button>
          <button class="btn btn-danger" @click="enableArea(); deleteEmployeeModalFunc()">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
  <!-- List des utilisateurs pour chaque séance -->
  <div id="ListUsersModal" v-if="listUsers">
    <ListUsersByLesson  :selectedSession="items[selectedRow].columns" @hideListEvent="hideListEvent" ></ListUsersByLesson>
  </div> 


</template>

<script>

import DateTimeCmp from "./DateTimeCmp.vue";
import useVuelidate from '@vuelidate/core'
import ListUsersByLesson from "./ListUsersByLesson.vue";
import UsersDataService from "@/services/UsersDataService";

export function
  validTitre(titre) {
  if (!titre) {
    return false
  }
  if (titre.length > 40 || titre.length == 0) {
    return false
  }
  console.log(" je suis dans validTitre, le titre est ", titre);
  let validTitrePattern = new RegExp("^[a-zA-Z0-9À-ÿ\\s]+(?:[-'\\s][a-zA-Z0-9]*)*$");
  if (validTitrePattern.test(titre)) {
    return true;
  }
  return false;
}

export default {
  name: "TableCmp",
  components: { DateTimeCmp, ListUsersByLesson },
  props: ['session_type'],
  data() {
    return {
      v$: useVuelidate(),
      sessionAlreadyExistsError: false,
      isDesactive: false,
      listUsers: false,
      items: [],
      columns: [],
      titreTableau: "",
      editEmployeeModal: false,
      addEmployeeModal: false,
      deleteEmployeeModal: false,
      selectedRow: null,
      selectedRowContent: {id:null, titre: null, date: null, heure: null },
      // addedRowContent: { titre: null },
      defaultTime: null,
      editedDate: null,
      sessionTitle: null
    };
  },
  // validations() {
  //   return {
  //     addedRowContent: {
  //       titre: {
  //         titre_validation: {
  //           $validator: validTitre,
  //           $message: 'Titre Invalid'
  //         }
  //       }
  //     },

  //     selectedRowContent: {
  //       titre: {
  //         titre_validation: {
  //           $validator: validTitre,
  //           $message: 'Titre Invalid'
  //         }
  //       }
  //     }
      
  //   }
  // },
  async mounted() {
    await UsersDataService.getCoachSessionTitle(this.session_type)
      .then((result) => {
        console.log(" Coach lessons get Title succesffully")
        console.log(result.data[0].name);
        this.sessionTitle = result.data[0].name;

      })
      .catch((e) =>{
        console.log(" Error in coach lessons Title Fetching ")
        console.log(e)
      });

    UsersDataService.getCoachSessionList(this.session_type)
      .then((result) => {
        console.log(" Coach lessons Fetched Successfuly ")
        console.log(result.data);
        let sessionDate;
        let item;
        // Session Data 
        let formatedDate;
        let formatedTime;
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
          // Session id
          sessionId = session.session_id;
          console.log(sessionId);
          item = { columns: {id:sessionId,title:this.sessionTitle,date:formatedDate,time:formatedTime}};
          this.items.push(item);

        });
      })
      .catch((e) =>{
        console.log(" Error in coach lessons Fetching ")
        console.log(e)
      });

    this.columns = [{ column: "Id", type: null },{ column: "Titre", type: "text" }, { column: "Date : aaaa/mm/jj ", type: "TimePicker" }, { column: "Heure", type: null }, { column: "Actions", type: null }];
    this.titreTableau = "Séances";
    console.log(" Mounted ");
  },

  methods: {
    editEmployeeModalFunc(index) {
      this.sessionAlreadyExistsError = false;
      this.selectedRow = index;
      let selectedRowContentArray = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));

      // this.selectedRowContent.id     = selectedRowContentArray.id;
      // this.selectedRowContent.titre  = selectedRowContentArray.title;
      this.selectedRowContent.date   = selectedRowContentArray.date;
      this.selectedRowContent.heure  = selectedRowContentArray.time;
      // // Set the default date in the edited frame and send it as prop
      // // Concatenate the date and the time 
      // // Delete additional spaces
      this.defaultTime = this.without_spaces(this.selectedRowContent.date + 'T' + this.selectedRowContent.heure);
      this.editEmployeeModal = true;
    },
    editEmployeeModalFuncSave() {
      // let avantModification = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));
      // let apresModification = JSON.parse(JSON.stringify(this.selectedRowContent));
      // console.log("Nomalize", (apresModification))

      // this.v$.$validate();
      // console.log("Input error : ", this.v$.selectedRowContent.$error);
      // console.log(" : ", this.v$.selectedRowContent.$error);

      // if (this.v$.selectedRowContent.$error) {
      //   return
      // }
      // Update date 
      let update = false;
      const {modifiedDate,NewDate,NewTime} = this.saveNewDate();
      console.log("modifiedDate =>  ",modifiedDate);
      if(modifiedDate){
        update = true;
      }

      // // Update texts
      // For this array we have only Title that can be modifies as text
      // console.log("//////////////////////////////////////////");
      // for (let i = 1; i < Object.values(avantModification).length; i++) {
      //   console.log(this.normalize_spaces(Object.values(avantModification)[i]));
      //   console.log(this.normalize_spaces(Object.values(apresModification)[i]));
      //   if (this.normalize_spaces(Object.values(avantModification)[i]) !== this.normalize_spaces(Object.values(apresModification)[i])) {
      //     console.log(" je suis dans la modification du text ");
      //     // console.log(this.normalize_spaces(Object.values(avantModification)[i]));
      //     // console.log(this.normalize_spaces(Object.values(apresModification)[i]));
      //     update = true;
      //     break;
      //   }
      // }
      // console.log("//////////////////////////////////////////");
      
      console.log(update);
      if(update){
        console.log('////////////////////////////////////////////////////////////////');
        // Update the session in the database.
        let editedSession = { id   : this.items[this.selectedRow].columns.id,
                              title: this.sessionTitle,
                              date : NewDate,
                              time : NewTime
                            };
        
        UsersDataService.editCoachSession(editedSession)
        .then((result) => {
          console.log(result)
          console.log(" SESSION UPDATED SUCCESSFFULY");
          this.editEmployeeModal = false;
          location.reload();
        })
        .catch((e) =>{
          if(e.response.status === 409){
            this.sessionAlreadyExistsError = true;
            console.log(" SESSION WITH THE SAME DATE ALREADY EXISTS");
            return
          }
          console.log(" ERROR IN UPDATING SESSION ");
          console.log(e)
          return
        });
      }else{
        this.editEmployeeModal = false;
      }
    },

    
    deleteEmployeeModalFunc() {
      let index = this.selectedRow
      console.log("selectedRow : ", this.reactiveVarDecomp(this.items[index]));
      let deletedRow = this.reactiveVarDecomp(this.items[index]);
      let deletedSessionId =  deletedRow.columns.id;
      console.log( " Deleted Id = ", deletedSessionId);
      let data = {
        deletedSessionId
      };
      console.log(" la data envoyé ", data);
      UsersDataService.deleteCoachSessionId(data)
        .then((result) => {
          console.log(result)
          // this.mounted();
          location.reload();
          // this.$router.push("/coach/seances");
        })
        .catch((e) =>{
          console.log(" ERROR IN DELETING SESSION ");
          console.log(e)
        });

      // this.items.splice(index, 1);
      this.deleteEmployeeModal = false;
    },
    normalize_spaces(str) {
      return str.trim().replace(/\s+/g, ' ')
    },
    without_spaces(str) {
      return str.trim().replace(/\s+/g, '')
    },
    disableArea() {
      this.$emit('clicked', true)
    },
    enableArea() {
      console.log("Enable");
      this.$emit('clicked', false)
    },
    addEmployeeModalFunc() {
      
      let zero_month = ''
      let zero_day = ''
      let zero_hour = ''
      let zero_minute = ''
      if (this.editedDate.month < 10) {
        zero_month = '0'
      }
      if (this.editedDate.day < 10) {
        zero_day = '0'
      }
      if (this.editedDate.hour < 10) {
        zero_hour = '0'
      }
      if (this.editedDate.minute < 10) {
        zero_minute = '0'
      }

      let NewDate = this.editedDate.year + '-' + zero_month + this.editedDate.month + '-' + zero_day + this.editedDate.day
      // console.log(NewDate);
      let NewTime = zero_hour + this.editedDate.hour + ':' + zero_minute + this.editedDate.minute
      // console.log(NewTime);
      let NewRow = {title : this.sessionTitle,
                    date  : NewDate,
                    time  : NewTime,
                    session_type : this.session_type};
      // this.addedRowContent.push(NewDate);
      // this.addedRowContent.push(NewTime);
      console.log(NewRow);

      // Vérifier si le titre n'est pas vide avant d'ajouter un nouveau élément
      ////////////////////////////////////////////////
      ////////////////////////////////////////////////////
      //////////////////////////////////////////////////
      ////////////////////////////////////////// 

      // Initialize the input message error
      // this.v$.$validate();
      // console.log("Input error : ", this.v$.addedRowContent.$error);
      // console.log(" : ", this.v$.addedRowContent.$error);

      // if (this.v$.addedRowContent.$error) {
      //   return
      // }

      // Send Post request to the serever to add the new session
      UsersDataService.addCoachSession(NewRow)
        .then((result) => {
          console.log(result);
          console.log(" SESSION ADDED SUCCESSFFULY ");
          // this.addedRowContent = [{ title: null }];
          this.enableArea();
          this.addEmployeeModal = false;
          location.reload();
        })
        .catch((e) =>{
          console.log(e)
          if(e.response.status === 409){
            this.sessionAlreadyExistsError = true;
            console.log(" SESSION WITH THE SAME DATE ALREADY EXISTS");
            return
          }
          console.log(" ERROR IN ADDING COACH SESSION ");
          return
        });

    },

    DateUpdated(time) {
      this.editedDate = time;
      console.log('I am the table the time is ', this.editedDate);
    },

    saveNewDate() {
      let zero_month = ''
      let zero_day = ''
      let zero_hour = ''
      let zero_minute = ''

      if (this.editedDate.month < 10) {
        zero_month = '0'
      }
      if (this.editedDate.day < 10) {
        zero_day = '0'
      }
      if (this.editedDate.hour < 10) {
        zero_hour = '0'
      }
      if (this.editedDate.minute < 10) {
        zero_minute = '0'
      }

      let NewDate = this.editedDate.year + '-' + zero_month + this.editedDate.month + '-' + zero_day + this.editedDate.day
      console.log("New date :",NewDate);
      let NewTime = zero_hour + this.editedDate.hour + ':' + zero_minute + this.editedDate.minute
      console.log("New time :",NewTime);


      if (this.items[this.selectedRow].columns.date != NewDate || this.items[this.selectedRow].columns.time != NewTime) {
        console.log(" The date was edited by the user ");
        // this.items[this.selectedRow].columns.date = NewDate
        // console.log(this.items[this.selectedRow].columns.date)
        // this.items[this.selectedRow].columns.time = NewTime;
        // console.log(this.items[this.selectedRow].columns.time)
        return {modifiedDate: true ,NewDate,NewTime};
                
      } else {
        console.log(" The date was NOT edited by the user ");
        return {modifiedDate: false ,NewDate,NewTime};

      }
    },
    hideListEvent(){
      this.listUsers = false;
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
    reactiveVarDecomp(react){
      return JSON.parse(JSON.stringify(react));
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
  min-width: 1000px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  overflow: auto;
  height: 600px;
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
.table-title .btn-group {
  float: right;
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
  width: 150px;
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
table.table .avatar {
  border-radius: 50%;
  vertical-align: middle;
  margin-right: 10px;
}
.pagination {
  float: right;
  margin: 0 0 5px;
}
.pagination li a {
  border: none;
  font-size: 13px;
  min-width: 30px;
  min-height: 30px;
  color: #999;
  margin: 0 2px;
  line-height: 30px;
  border-radius: 2px !important;
  text-align: center;
  padding: 0 6px;
}
.pagination li a:hover {
  color: #666;
}
.pagination li.active a,
.pagination li.active a.page-link {
  background: #03a9f4;
}
.pagination li.active a:hover {
  background: #0397d6;
}
.pagination li.disabled i {
  color: #ccc;
}
.pagination li i {
  font-size: 16px;
  padding-top: 6px;
}
.hint-text {
  float: left;
  margin-top: 10px;
  font-size: 13px;
}

/* Custom checkbox */
.custom-checkbox {
  position: relative;
}
.custom-checkbox input[type="checkbox"] {
  opacity: 0;
  position: absolute;
  margin: 5px 0 0 3px;
  z-index: 9;
}
.custom-checkbox label:before {
  width: 18px;
  height: 18px;
}
.custom-checkbox label:before {
  content: "";
  margin-right: 10px;
  display: inline-block;
  vertical-align: text-top;
  background: white;
  border: 1px solid #bbb;
  border-radius: 2px;
  box-sizing: border-box;
  z-index: 2;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  content: "";
  position: absolute;
  left: 6px;
  top: 3px;
  width: 6px;
  height: 11px;
  border: solid #000;
  border-width: 0 3px 3px 0;
  transform: inherit;
  z-index: 3;
  transform: rotateZ(45deg);
}
.custom-checkbox input[type="checkbox"]:checked + label:before {
  border-color: #03a9f4;
  background: #03a9f4;
}
.custom-checkbox input[type="checkbox"]:checked + label:after {
  border-color: #fff;
}
.custom-checkbox input[type="checkbox"]:disabled + label:before {
  color: #b8b8b8;
  cursor: auto;
  box-shadow: none;
  background: #ddd;
}
/* ---------------------------------------------- */

/* Modal styles */
.modal .modal-dialog {
  max-width: 400px;
}
.modal .modal-header,
.modal .modal-body,
.modal .modal-footer {
  padding: 20px 30px;
}
.modal .modal-content {
  border-radius: 3px;
  font-size: 14px;
}
.modal .modal-footer {
  background: #ecf0f1;
  border-radius: 0 0 3px 3px;
}
.modal .modal-title {
  display: inline-block;
}
.modal .form-control {
  border-radius: 2px;
  box-shadow: none;
  border-color: #dddddd;
}
.modal textarea.form-control {
  resize: vertical;
}
.modal .btn {
  border-radius: 2px;
  min-width: 100px;
}
.modal form label {
  font-weight: normal;
}

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

div.input-errors {
  color: red;
}
</style>
