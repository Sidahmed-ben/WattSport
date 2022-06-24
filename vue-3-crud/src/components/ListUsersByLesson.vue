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
              <td v-for="(column,index2) in item.columns" :key="index2">{{ column }}</td>
              <td>
                <div>
                  <button type="button" class="btn btn-outline-success Valider">Valider</button>
                  <button type="button" class="btn btn-outline-danger Supprimer">Supprimer</button>
                  <!-- <a
                    class="delete"
                    data-toggle="modal"
                    @click="disableArea(); deleteEmployeeModal = true; selectedRow = index1;"
                  >
                    <i class="bi bi-trash-fill"></i>
                  </a>
                  <a
                    class="list"
                    data-toggle="modal"
                    @click="disableArea(); deleteEmployeeModal = true; selectedRow = index1;"
                  >
                    <i class="bi bi-list-ul"></i>
                  </a> -->
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

import useVuelidate from '@vuelidate/core'

export function
  validTitre(titre) {
  if (!titre) {
    return false
  }
  if (titre.length > 40) {
    return false
  }
  console.log(" je suis dans validTitre, le titre est ", titre);
  let validTitrePattern = new RegExp("^[a-zA-Z0-9]+(?:[-'\\s][a-zA-Z0-9]*)*$");
  if (validTitrePattern.test(titre)) {
    return true;
  }
  return false;
}

export default {
  name: "ListUsersByLesson",
  components: {  },
  props: [],
  data() {
    return {
      v$: useVuelidate(),
      isDesactive: false,
      items: [],
      columns: [],
      titreTableau: "",
      editEmployeeModal: false,
      addEmployeeModal: false,
      deleteEmployeeModal: false,
      selectedRow: null,
      selectedRowContent: { titre: null, date: null, heure: null },
      addedRowContent: { titre: null },
      defaultTime: null,
      editedDate: null
    };
  },
  validations() {
    return {
      addedRowContent: {
        titre: {
          titre_validation: {
            $validator: validTitre,
            $message: 'Titre Invalid'
          }
        }
      },
      selectedRowContent: {
        titre: {
          titre_validation: {
            $validator: validTitre,
            $message: 'Titre Invalid'
          }
        }
      }


    }
  },
  mounted() {
    this.items = 
    [
      { columns: [" Utilisateur 1 "] },
      { columns: [" Utilisateur 2 "] },
      { columns: [" Utilisateur 3"] },
      { columns: [" Utilisateur 4"] },
      { columns: [" Utilisateur 5"] },
      { columns: [" Utilisateur 6"] },
      { columns: [" Utilisateur 7"] },
      { columns: [" Utilisateur 8"] },
      { columns: [" Utilisateur 9"] },
      { columns: [" Utilisateur 10"] },
      { columns: [" Utilisateur 11"] },
      { columns: [" Utilisateur 12"] },
    ],
    this.columns = [{ column: "Titre", type: "text" }, { column: "Actions", type: null }];
    this.titreTableau = "List des utilisateurs ";
    console.log(" Mounted ");
  },

  methods: {
    editEmployeeModalFunc(index) {
      this.selectedRow = index;
      let selectedRowContentArray = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));
      this.selectedRowContent.titre = selectedRowContentArray[0];
      this.selectedRowContent.date = selectedRowContentArray[1];
      this.selectedRowContent.heure = selectedRowContentArray[2]
      // Set the default date in the edited frame and send it as prop
      // Concatenate the date and the time 
      // Delete additional spaces
      this.defaultTime = this.without_spaces(this.selectedRowContent.date + 'T' + this.selectedRowContent.heure);
      this.editEmployeeModal = true;
    },
    editEmployeeModalFuncSave() {
      let avantModification = JSON.parse(JSON.stringify(this.items[this.selectedRow].columns));
      let apresModification = JSON.parse(JSON.stringify(this.selectedRowContent));
      console.log("Nomalize", (apresModification))

      this.v$.$validate();
      console.log("Input error : ", this.v$.selectedRowContent.$error);
      console.log(" : ", this.v$.selectedRowContent.$error);

      if (this.v$.selectedRowContent.$error) {
        return
      }

      // Update date 
      this.saveNewDate();
      // Update texts
      for (let i = 0; i < avantModification.length; i++) {
        if (this.normalize_spaces(avantModification[i]) !== this.normalize_spaces(Object.values(apresModification)[i])) {
          console.log("Modified")
          console.log(apresModification);
          // Ajouter l'élément modifiè dans le tableau 
          this.items.splice(this.selectedRow, 1, { columns: Object.values(apresModification) });
          this.editEmployeeModal = false;
          return
        }
      }

      this.editEmployeeModal = false;

    },
    deleteEmployeeModalFunc() {
      let index = this.selectedRow
      console.log("selectedRow : ", this.items[index]);
      this.items.splice(index, 1);
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
    hideListEvent() {
      console.log("HideList");
      this.$emit('hideListEvent')
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
  width: 230px;
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
