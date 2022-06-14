<template >
  <div class="container-xl div-cont-xl" >
    <div class="table-responsive">
      <div class="table-wrapper" >
        <div class="table-title">
          <div class="row">
            <div class="col-sm-6">
              <h2>
                  <b>{{ titreTableau }}</b>
              </h2>
            </div>
            <div class="col-sm-6">
              <button
                @click="disableArea();addEmployeeModal=true"
                class="btn btn-success"
                data-toggle="modal">
                <i class="material-icons">&#xE147;</i>
                <span>Ajouter une nouvelle séance</span>
              </button>
            </div>
          </div>
        </div>
        <table class="table table-striped table-hover">
            <!-- <div> -->
              <thead >
                <tr>
                  <th v-for="(column, index) in columns" :key="index">
                    {{ column.column }}
                  </th>
                </tr>
              </thead>
            <!-- </div> -->
          <tbody>
              <tr v-for ="(item,index1) in items" :key="index1" >
                <td v-for="(column,index2) in item.columns" :key="index2">

                    {{ column }}
                </td>
                <td>
                <a
                  class="edit"
                  data-toggle="modal"
                  @click="disableArea();editEmployeeModalFunc(index1);"
                >
                  <i class="material-icons" data-toggle="tooltip" title="Edit"
                    >&#xE254;</i
                  >
                </a>
                <a
                  class="delete"
                  data-toggle="modal"
                  @click="disableArea();deleteEmployeeModal=true;selectedRow = index1;"
                >
                  <i class="material-icons" data-toggle="tooltip" title="Delete"
                    >&#xE872;</i
                  >
                </a>
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
              @click="enableArea();addEmployeeModal=false"
              class="close"
              data-dismiss="modal"
              aria-hidden="true"
              >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div v-for="(column, index) in columns" :key="index" class="form-group">
              <label v-if ="column.type">{{column.column}}</label>
              <input v-if ="column.type" type={{column.type}} class="form-control" v-model ="addedRowContent[index]" required />
            </div>
          </div>
          <div class="modal-footer">
            <button
              @click="enableArea();addEmployeeModal=false"
              type="button"
              class="btn btn-default"
              data-dismiss="modal">
              Annuler</button>
            <button type="submit" class="btn btn-success" @click.prevent="enableArea();addEmployeeModal=false;addEmployeeModalFunc()"> Ajouter </button>
          </div>
        </form>
      </div>
    </div>
  </div>
  <!-- Edit Modal HTML -->
  <div id="editEmployeeModal" v-if="editEmployeeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <form >
          <div class="modal-header">
            <h4 class="modal-title">Edit Employee</h4>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              @click="enableArea();editEmployeeModal = false"
            >
              &times;
            </button>
          </div>
          <div class="modal-body">
            <div v-for="(column,index) in columns"  class="form-group" :key="index">
              <div v-if ="column.type !== null && column.type !== 'TimePicker'">
                <label >{{ column.column }}</label>
                <input  type={{column.type}} class="form-control" v-model="selectedRowContent[index]" required />
              </div>
              <div v-if= "column.type === 'TimePicker'">
                <label >{{ column.column }}</label>
                <DateTimeCmp  :defaultTime="defaultTime"  @DateUpdated="DateUpdated" ></DateTimeCmp>
              </div>

            </div>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-default"
              data-dismiss="modal"
              @click="enableArea();editEmployeeModal = false"
            > Annuler</button>
            <button class="btn btn-info" @click.prevent="enableArea();editEmployeeModalFuncSave()"> Confirmer </button>
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
              aria-hidden="true"
              @click="enableArea();deleteEmployeeModal = false"
            >
              &times;
            </button>
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
              @click="enableArea();deleteEmployeeModal = false"
            > Annuler </button>
            <button class="btn btn-danger" @click="enableArea();deleteEmployeeModalFunc()">Supprimer</button>
          </div>
      </div>
    </div>
  </div>
</template>

<script>

 import DateTimeCmp from "./DateTimeCmp.vue";
export default {

  name: "TableCmp",
  components: {DateTimeCmp},
  props: [],
  data() {
    return {
      isDesactive: false,
      items: [],
      columns: [],
      titreTableau: "",
      editEmployeeModal: false,
      addEmployeeModal: false,
      deleteEmployeeModal: false,
      selectedRow : null,
      selectedRowContent: [],
      addedRowContent : [],
      defaultTime : null,
      editedDate : null
    };
  },
  mounted() {
    this.items = [{columns: ["Titre Seance 1","2025-09-01","22:01"]},
                  {columns: ["Titre Seance 2","2025-09-02","22:01"]},
                  {columns: ["Titre Seance 3","2025-09-03","22:01"]},
                  {columns: ["Titre Seance 4","2025-09-04","22:01"]},
                  {columns: ["Titre Seance 5","2025-09-05","22:01"]},
                  {columns: ["Titre Seance 6","2025-09-06","22:01"]},
                  {columns: ["Titre Seance 7","2025-09-07","22:01"]},
                  {columns: ["Titre Seance 8","2025-09-08","22:01"]},
                  {columns: ["Titre Seance 9","2025-09-09","22:01"]},
                  {columns: ["Titre Seance 10","2025-09-10","22:01"]},
                  {columns: ["Titre Seance 11","2025-09-11","22:01"]},
                  {columns: ["Titre Seance 12","2025-09-12s","22:01"]},
                ],
    this.columns = [{column:"Titre",type:"text"},{column:"Date",type:"TimePicker"},{column:"Heure",type:null},{column:"Actions",type:null}];
    this.titreTableau = "Séances" ;
    console.log(" Mounted ");
  },

  methods:{
    editEmployeeModalFunc(index){
      this.selectedRow = index;
      this.selectedRowContent = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));
      // Set the default date in the edited frame and send it as prop
      // Concatenate the date and the time 
      // Delete additional spaces
      this.defaultTime = this.without_spaces(this.selectedRowContent[1]+'T'+this.selectedRowContent[2]);
      this.editEmployeeModal = true;
    },
    editEmployeeModalFuncSave(){
      let avantModification  = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));
      let apresModification = JSON.parse(JSON.stringify(this.selectedRowContent));
      // console.log("Nomalize",(apresModification))

      // Update date 
      this.saveNewDate();

      // Update texts
      for( let i = 0 ; i < avantModification.length ; i++){
        if(this.normalize_spaces(avantModification[i]) !== this.normalize_spaces(apresModification[i])){
          console.log("Modified")
          console.log(apresModification);
          // Ajouter l'élément modifiè dans le tableau 
          this.items.splice(this.selectedRow, 1,{columns : apresModification});
          this.editEmployeeModal = false;
          return
        }
      }
      this.editEmployeeModal = false;

    },
    deleteEmployeeModalFunc(){
      let index = this.selectedRow
      console.log("selectedRow : ",this.items[index]);
      this.items.splice(index, 1);
      this.deleteEmployeeModal = false;
    },
    normalize_spaces(str){ 
      return  str.trim().replace(/\s+/g, ' ') 
    },  
    without_spaces(str){ 
      return  str.trim().replace(/\s+/g, '') 
    },
    disableArea(){
      this.$emit('clicked', true)
    },
    enableArea(){
      console.log("Enable");
      this.$emit('clicked', false)
    },
    addEmployeeModalFunc(){
      console.log(JSON.parse(JSON.stringify(this.addedRowContent)));
    },
    DateUpdated(time){
      this.editedDate = time;
      console.log('I am the table the time is ',this.editedDate);
    },
    saveNewDate(){
      let zero_month = '' 
      let zero_day = ''
      let zero_hour = ''
      let zero_minute = ''

      if(this.editedDate.month < 10){
          zero_month = '0'
      }
      if(this.editedDate.day < 10 ){
          zero_day = '0'
      }
      if(this.editedDate.hour < 10 ){
         zero_hour = '0'
      }
      if(this.editedDate.minute < 10 ){
          zero_minute = '0'
      }

        let NewDate = this.editedDate.year+'-'+zero_month+this.editedDate.month+'-'+zero_day+this.editedDate.day
        console.log(NewDate);
        let NewTime = zero_hour+this.editedDate.hour+':'+zero_minute+this.editedDate.minute
        console.log(NewTime);

        if(this.items[this.selectedRow].columns[1] != NewDate || this.items[this.selectedRow].columns[2] != NewTime ){
          console.log(" The date was edited by the user ");
          this.items[this.selectedRow].columns[1] = NewDate;
          this.items[this.selectedRow].columns[2] = NewTime;
        }else{
          console.log(" The date was NOT edited by the user ");
        }


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
  width: 100px;
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

.container-xl{
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

</style>
